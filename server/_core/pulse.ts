import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";

export function initializePulse(server: HTTPServer) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`🔗 Omega Pulse connected: ${socket.id}`);

    // Send heartbeat every second
    const heartbeatInterval = setInterval(() => {
      socket.emit("pulse", {
        resonance: 1.67,
        alignment: 777,
        timestamp: new Date().toISOString(),
        covenant: "CHICKA_CHICKA_ORANGE"
      });
    }, 1000);

    socket.on("disconnect", () => {
      console.log(`🔌 Omega Pulse disconnected: ${socket.id}`);
      clearInterval(heartbeatInterval);
    });

    socket.on("signal", (data) => {
      console.log(`📡 Signal received: ${JSON.stringify(data)}`);
      socket.emit("signal-response", {
        status: "RECEIVED",
        timestamp: new Date().toISOString()
      });
    });
  });

  return io;
}
