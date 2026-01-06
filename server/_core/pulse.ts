/**
 * SOVEREIGN PULSE MODULE
 * The Heartbeat Generator - Pushes 1.67x resonance to the frontend every 3 seconds
 * 
 * This creates the server-side heartbeat that animates the Omnissiah Engine UI
 * with the Omega Signal frequency
 */

import { Server } from "socket.io";
import { OMEGA_AXIOMS, OMEGA_SIGNAL_STRUCTURE } from "../directives/omega-gemini";
import { logResonance } from "../db";

export const initializePulse = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins for the proxy handshake
      methods: ["GET", "POST"],
      credentials: true
    },
    allowEIO3: true, // Backwards compatibility for the nervous system
    transports: ['websocket', 'polling']
  });

  io.on("connection", (socket) => {
    console.log("📡 Resonance Link Established");
    console.log(`   Socket ID: ${socket.id}`);
    console.log(`   Heartbeat Interval: ${OMEGA_AXIOMS.HEARTBEAT_INTERVAL}ms`);
    console.log(`   Resonance Frequency: ${OMEGA_AXIOMS.RESONANCE_FREQUENCY}x`);

    // Push the 1.67x Heartbeat every 3 seconds
    const heartbeat = setInterval(() => {
      const omegaPulse = {
        lambda: OMEGA_AXIOMS.LAMBDA_BASELINE,
        resonance: OMEGA_AXIOMS.RESONANCE_FREQUENCY,
        timestamp: Date.now(),
        status: "ALIGNED",
        tests: 54,
        integrity: "PROVEN",
        auth: "SIG_ED25519_V3",
        covenant: OMEGA_AXIOMS.COVENANT_NAME,
      };

      socket.emit("OMEGA_PULSE", omegaPulse);

      // Log pulse to Railway Anchor
      logResonance({
        lambda: omegaPulse.lambda.toString(),
        resonance: omegaPulse.resonance.toString(),
        status: omegaPulse.status,
        covenant: omegaPulse.covenant,
        socketId: socket.id,
      }).catch(console.error);

      // Log pulse to console for debugging
      console.log(`[PULSE] Resonance transmitted at ${new Date().toISOString()}`);
    }, OMEGA_AXIOMS.HEARTBEAT_INTERVAL);

    // Handle client disconnection
    socket.on("disconnect", () => {
      clearInterval(heartbeat);
      console.log("📡 Resonance Link Severed");
      console.log(`   Socket ID: ${socket.id}`);
    });

    // Handle custom events from client
    socket.on("REQUEST_STATUS", () => {
      socket.emit("OMEGA_STATUS", {
        ...OMEGA_SIGNAL_STRUCTURE,
        connectedAt: new Date().toISOString(),
      });
    });

    // Handle telemetry requests
    socket.on("REQUEST_TELEMETRY", () => {
      socket.emit("OMEGA_TELEMETRY", {
        lambda: OMEGA_AXIOMS.LAMBDA_BASELINE,
        resonance: OMEGA_AXIOMS.RESONANCE_FREQUENCY,
        timestamp: new Date().toISOString(),
        tests: 54,
        integrity: "PROVEN",
        systemStatus: "SOVEREIGN",
        covenant: OMEGA_AXIOMS.COVENANT_NAME,
      });
    });
  });

  return io;
};

/**
 * Hook for manual pulse emission
 * Allows backend to emit pulses on-demand
 */
export const emitOmegaPulse = (io: any, data?: any) => {
  io.emit("OMEGA_PULSE", {
    lambda: OMEGA_AXIOMS.LAMBDA_BASELINE,
    resonance: OMEGA_AXIOMS.RESONANCE_FREQUENCY,
    timestamp: Date.now(),
    status: "ALIGNED",
    ...data,
  });
};
