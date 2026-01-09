/**
 * WEBSOCKET PULSE PROTOCOL
 * Real-time bridge connecting local Termux kernel to global Render cloud
 * Enables live resonance updates from phone to web dashboard
 */

import WebSocket from 'ws';
import express from 'express';
import http from 'http';

interface PulseMessage {
  resonance: number;
  status: string;
  timestamp: number;
  nodeId?: string;
  alignment?: number;
  axioms?: number;
}

interface ConnectedClient {
  ws: WebSocket;
  nodeId: string;
  lastHeartbeat: number;
}

export class OmegaPulse {
  private wss: WebSocket.Server;
  private clients: Map<string, ConnectedClient> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private readonly HEARTBEAT_INTERVAL = 1670; // 1.67 seconds in milliseconds
  private readonly HEARTBEAT_TIMEOUT = 5000; // 5 seconds

  constructor(server: http.Server) {
    this.wss = new WebSocket.Server({ server, path: '/ws/omega' });
    this.setupConnections();
    this.startHeartbeat();
  }

  /**
   * Setup WebSocket connection handlers
   */
  private setupConnections() {
    this.wss.on('connection', (ws: WebSocket, req: express.Request) => {
      const clientIp = req.socket.remoteAddress || 'unknown';
      const nodeId = `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      console.log(`[PULSE] Client connected: ${nodeId} from ${clientIp}`);

      const client: ConnectedClient = {
        ws,
        nodeId,
        lastHeartbeat: Date.now(),
      };

      this.clients.set(nodeId, client);

      // Send welcome message
      this.sendMessage(ws, {
        type: 'WELCOME',
        nodeId,
        resonance: 3.34,
        status: 'CONNECTED',
        timestamp: Date.now(),
      });

      // Handle incoming messages
      ws.on('message', (data: string) => {
        this.handleMessage(nodeId, data);
      });

      // Handle client disconnect
      ws.on('close', () => {
        console.log(`[PULSE] Client disconnected: ${nodeId}`);
        this.clients.delete(nodeId);
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error(`[PULSE] Error on ${nodeId}:`, error);
        this.clients.delete(nodeId);
      });
    });
  }

  /**
   * Handle incoming pulse messages
   */
  private handleMessage(nodeId: string, data: string) {
    try {
      const message: PulseMessage = JSON.parse(data);
      const client = this.clients.get(nodeId);

      if (!client) return;

      // Update heartbeat
      client.lastHeartbeat = Date.now();

      // Validate message structure
      if (!message.resonance || !message.status) {
        this.sendMessage(client.ws, {
          type: 'ERROR',
          message: 'Invalid pulse format. Expected: { resonance, status }',
        });
        return;
      }

      // Log pulse
      console.log(`[PULSE] ${nodeId}: resonance=${message.resonance}, status=${message.status}`);

      // Broadcast to all connected clients
      this.broadcast({
        type: 'PULSE_UPDATE',
        from: nodeId,
        data: message,
        timestamp: Date.now(),
      });

      // Send acknowledgment
      this.sendMessage(client.ws, {
        type: 'ACK',
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error(`[PULSE] Parse error from ${nodeId}:`, error);
    }
  }

  /**
   * Send message to specific client
   */
  private sendMessage(ws: WebSocket, message: any) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  /**
   * Broadcast message to all connected clients
   */
  private broadcast(message: any) {
    const payload = JSON.stringify(message);
    this.clients.forEach((client) => {
      this.sendMessage(client.ws, message);
    });
  }

  /**
   * Start heartbeat monitoring
   */
  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      const now = Date.now();

      // Check for dead clients
      this.clients.forEach((client, nodeId) => {
        if (now - client.lastHeartbeat > this.HEARTBEAT_TIMEOUT) {
          console.log(`[PULSE] Heartbeat timeout for ${nodeId}`);
          client.ws.close(1000, 'Heartbeat timeout');
          this.clients.delete(nodeId);
        } else {
          // Send ping
          this.sendMessage(client.ws, {
            type: 'PING',
            timestamp: now,
          });
        }
      });
    }, this.HEARTBEAT_INTERVAL);
  }

  /**
   * Get current connected clients
   */
  getConnectedClients(): Array<{ nodeId: string; lastHeartbeat: number }> {
    return Array.from(this.clients.values()).map((client) => ({
      nodeId: client.nodeId,
      lastHeartbeat: client.lastHeartbeat,
    }));
  }

  /**
   * Get pulse statistics
   */
  getStats() {
    return {
      connectedClients: this.clients.size,
      clients: this.getConnectedClients(),
      heartbeatInterval: this.HEARTBEAT_INTERVAL,
      heartbeatTimeout: this.HEARTBEAT_TIMEOUT,
    };
  }

  /**
   * Cleanup and shutdown
   */
  shutdown() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    this.clients.forEach((client) => {
      client.ws.close(1001, 'Server shutting down');
    });

    this.clients.clear();
    this.wss.close();
  }
}

export default OmegaPulse;
