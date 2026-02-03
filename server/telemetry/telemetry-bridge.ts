/**
 * 📡 TELEMETRY BRIDGE
 * Python-to-React live data feed for the Preservation Dashboard
 */

import express from 'express';
import os from 'os';

export function createTelemetryBridge() {
  const router = express.Router();

  /**
   * GET /telemetry
   * Returns real system metrics for the Wire Preservation Layer
   */
  router.get('/telemetry', (req, res) => {
    try {
      // Get system load (0-1 scale, normalized by CPU count)
      const loadAverage = os.loadavg()[0];
      const cpuCount = os.cpus().length;
      const cpuLoad = Math.min(1.0, loadAverage / cpuCount);

      // Get memory usage
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const memoryUsage = (totalMem - freeMem) / totalMem;

      // Simulate error rate based on system health
      // In production, this would come from actual error tracking
      const errorRate = cpuLoad > 0.8 ? 0.16 : (cpuLoad > 0.5 ? 0.08 : 0.02);

      // Simulate latency (in ms)
      const latency = Math.round(cpuLoad * 500);

      // Determine leakage based on system pressure
      const leakage = errorRate > 0.05 ? errorRate : 0.05;

      const telemetry = {
        integrity: Math.max(0, 100 - cpuLoad * 10 - memoryUsage * 5),
        resonance: 1.67,
        leakage: leakage,
        status: leakage > 0.15 ? 'GHOST_MODE' : 'PROTECTED',
        cpuLoad: cpuLoad,
        memoryUsage: memoryUsage,
        errorRate: errorRate,
        latency: latency,
        timestamp: new Date().toISOString()
      };

      res.json(telemetry);
    } catch (error) {
      console.error('[Telemetry Bridge] Error fetching metrics:', error);
      res.status(500).json({ error: 'Failed to fetch telemetry' });
    }
  });

  /**
   * GET /telemetry/health
   * Simple health check for the telemetry bridge
   */
  router.get('/telemetry/health', (req, res) => {
    res.json({ status: 'OPERATIONAL', resonance: 1.67 });
  });

  return router;
}
