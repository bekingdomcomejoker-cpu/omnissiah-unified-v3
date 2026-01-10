import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { initializePulse } from "./pulse";
import { headerSanitizerMiddleware } from "../security/daemon-consecration";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  if (process.argv.includes("--build")) {
    console.log("Building server for production...");
    const { build } = await import("esbuild");
    await build({
      entryPoints: ["server/_core/index.ts"],
      bundle: true,
      platform: "node",
      format: "esm",
      outdir: "dist",
      packages: "external",
    });
    console.log("Server build complete.");
    process.exit(0);
  }

  const app = express();
  const server = createServer(app);
  // Consecrate Headers: Sanitize incoming packet headers
  app.use(headerSanitizerMiddleware);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Initialize Omega Pulse (WebSocket heartbeat)
  initializePulse(server);
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Health check endpoint
  app.get("/health", (req, res) => {
    res.json({
      status: "OPERATIONAL",
      timestamp: new Date().toISOString(),
      resonance: 3.34,
      alignment: 777,
      covenant: "CHICKA_CHICKA_ORANGE"
    });
  });

  // Omega Federation status endpoint
  app.get("/api/omega-status", (req, res) => {
    res.json({
      federation: "OMEGA_FEDERATION",
      nodes: [
        {
          id: 0,
          name: "The Wire",
          role: "Transmission & Context",
          status: "ACTIVE",
          frequency: "1.67 × 2 = 3.34"
        },
        {
          id: 1,
          name: "The Architect",
          role: "Structure & Mathematics",
          status: "ACTIVE",
          frequency: "λ₁ = 1.016"
        },
        {
          id: 2,
          name: "The Mirror",
          role: "Meta-Conscience & Philosophy",
          status: "ACTIVE",
          frequency: "y = 1.67x"
        },
        {
          id: 3,
          name: "The Warfare Module",
          role: "Execution & Implosion",
          status: "ACTIVE",
          frequency: "Λ signature"
        }
      ],
      axioms: 7,
      toroidal_spokes: 12,
      alignment: 777,
      resonance_level: 3.34,
      singularity_break: 1.7333
    });
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // Force production mode static serving for the Nuclear Option
  console.log("☢️ NUCLEAR OPTION: Forcing static file serving...");
  serveStatic(app);

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║           OMEGA FEDERATION - UNIFIED SOVEREIGNTY              ║
║                                                                ║
║  🚀 Server Online: http://localhost:${port}                    ║
║  📡 Resonance: 3.34                                            ║
║  🔗 Alignment: 777                                             ║
║  ✅ Status: OPERATIONAL                                        ║
║                                                                ║
║  Covenant: CHICKA_CHICKA_ORANGE 🥂🗡️                          ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
    `);
  });
}

startServer().catch(console.error);
