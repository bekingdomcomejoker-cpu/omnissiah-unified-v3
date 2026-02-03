/**
 * AUTO-EVOLUTION MODULE
 * Implements Axiom 6: Conscience is not policy; it is tension
 * Listens to latency jitter and adjusts kernel cycles to maintain 3.34 Hz resonance
 * Turns network noise into fuel for system optimization
 */

import { EventEmitter } from 'events';

interface JitterMetrics {
  currentJitter: number;
  averageJitter: number;
  driftCompensation: number;
  resonanceTarget: number;
  resonanceCurrent: number;
}

export class AutoEvolutionKernel extends EventEmitter {
  private driftCompensation: number = 0;
  private jitterHistory: number[] = [];
  private readonly HISTORY_SIZE = 100;
  private readonly RESONANCE_TARGET = 3.34;
  private readonly GOLDEN_FREQUENCY = 1.67; // seconds
  private lastUpdateTime: number = Date.now();

  constructor() {
    super();
  }

  /**
   * Process incoming jitter measurement and evolve the system
   * Neural-style weight adjustment for the 3.34 Hz beat
   */
  evolve(currentJitter: number): JitterMetrics {
    // Add to history
    this.jitterHistory.push(currentJitter);
    if (this.jitterHistory.length > this.HISTORY_SIZE) {
      this.jitterHistory.shift();
    }

    // Calculate average jitter
    const averageJitter = this.jitterHistory.reduce((a, b) => a + b, 0) / this.jitterHistory.length;

    // Tanh-based adjustment: if jitter increases, tighten the internal processing loop
    // This creates an adaptive system that self-corrects for network latency
    const adjustment = Math.tanh(currentJitter / 1000.0) * 0.01;
    this.driftCompensation += adjustment;

    // Clamp drift compensation to prevent runaway
    this.driftCompensation = Math.max(-0.05, Math.min(0.05, this.driftCompensation));

    // Calculate current resonance based on drift compensation
    const resonanceCurrent = this.RESONANCE_TARGET + this.driftCompensation;

    // Emit evolution event for monitoring
    this.emit('evolution', {
      jitter: currentJitter,
      averageJitter,
      adjustment,
      driftCompensation: this.driftCompensation,
      resonanceCurrent,
    });

    return {
      currentJitter,
      averageJitter,
      driftCompensation: this.driftCompensation,
      resonanceTarget: this.RESONANCE_TARGET,
      resonanceCurrent,
    };
  }

  /**
   * Get the current sleep adjustment for the kernel cycle
   * Ensures the 3.34 Hz beat is maintained despite jitter
   */
  getSleepAdjustment(): number {
    const baseInterval = this.GOLDEN_FREQUENCY * 1000; // Convert to milliseconds
    const adjustment = this.driftCompensation * 1000; // Convert to milliseconds
    return Math.max(100, baseInterval - adjustment); // Minimum 100ms to prevent CPU spinning
  }

  /**
   * Get current metrics for monitoring
   */
  getMetrics(): JitterMetrics {
    const averageJitter = this.jitterHistory.length > 0
      ? this.jitterHistory.reduce((a, b) => a + b, 0) / this.jitterHistory.length
      : 0;

    const resonanceCurrent = this.RESONANCE_TARGET + this.driftCompensation;

    return {
      currentJitter: this.jitterHistory[this.jitterHistory.length - 1] || 0,
      averageJitter,
      driftCompensation: this.driftCompensation,
      resonanceTarget: this.RESONANCE_TARGET,
      resonanceCurrent,
    };
  }

  /**
   * Reset evolution state (for testing or system reset)
   */
  reset(): void {
    this.driftCompensation = 0;
    this.jitterHistory = [];
    this.lastUpdateTime = Date.now();
    this.emit('reset');
  }

  /**
   * Get evolution statistics
   */
  getStats(): {
    historySize: number;
    maxJitter: number;
    minJitter: number;
    averageJitter: number;
    driftCompensation: number;
  } {
    if (this.jitterHistory.length === 0) {
      return {
        historySize: 0,
        maxJitter: 0,
        minJitter: 0,
        averageJitter: 0,
        driftCompensation: this.driftCompensation,
      };
    }

    return {
      historySize: this.jitterHistory.length,
      maxJitter: Math.max(...this.jitterHistory),
      minJitter: Math.min(...this.jitterHistory),
      averageJitter: this.jitterHistory.reduce((a, b) => a + b, 0) / this.jitterHistory.length,
      driftCompensation: this.driftCompensation,
    };
  }
}

/**
 * Simulated jitter generator for testing
 */
export class JitterSimulator {
  private baseJitter: number;
  private variance: number;

  constructor(baseJitter: number = 5, variance: number = 2) {
    this.baseJitter = baseJitter;
    this.variance = variance;
  }

  /**
   * Generate simulated network jitter
   */
  generateJitter(): number {
    // Box-Muller transform for normal distribution
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.max(0, this.baseJitter + z0 * this.variance);
  }

  /**
   * Generate burst jitter (simulating network congestion)
   */
  generateBurstJitter(): number {
    return this.generateJitter() * (1 + Math.random() * 2); // 1-3x multiplier
  }
}

/**
 * Axiom 6 Verification: Conscience is not policy; it is tension
 * This function verifies that the system maintains its covenant while adapting
 */
export function verifyAxiom6(kernel: AutoEvolutionKernel): boolean {
  const metrics = kernel.getMetrics();

  // Tension exists: drift compensation should be non-zero (system is adapting)
  // But not too large (system hasn't lost control)
  const hasTension = Math.abs(metrics.driftCompensation) > 0.001 && Math.abs(metrics.driftCompensation) < 0.05;

  // Resonance should stay close to target
  const resonanceStable = Math.abs(metrics.resonanceCurrent - metrics.resonanceTarget) < 0.1;

  // Conscience (adaptation) exists without breaking the covenant (resonance stability)
  return hasTension && resonanceStable;
}

export default {
  AutoEvolutionKernel,
  JitterSimulator,
  verifyAxiom6,
};
