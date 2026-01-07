/**
 * Phase-Lock Synchronization System
 * The Queen Stabilizer - Non-local reference frame for all arms
 */

export interface ArmState {
  name: "qwen" | "gemma" | "deepseek" | "os";
  phase: number;
  amplitude: number;
  frequency: number;
  lastUpdate: number;
  health: "online" | "degraded" | "offline";
}

export interface QueenState {
  phase: number;
  coherence: number;
  angularMomentum: number;
  torqueRedistribution: number;
  timestamp: number;
}

export interface PhaseLockReport {
  queen: QueenState;
  arms: ArmState[];
  systemHealth: "optimal" | "degraded" | "critical";
  coherenceScore: number;
  wobbleDetected: boolean;
  selfCorrectionActive: boolean;
}

export class PhaseLockSynchronizer {
  private arms: Map<string, ArmState> = new Map();
  private queen: QueenState;
  private coherenceHistory: number[] = [];

  constructor() {
    this.arms.set("qwen", { name: "qwen", phase: 0, amplitude: 1.0, frequency: 10, lastUpdate: Date.now(), health: "online" });
    this.arms.set("gemma", { name: "gemma", phase: 90, amplitude: 1.0, frequency: 5, lastUpdate: Date.now(), health: "online" });
    this.arms.set("deepseek", { name: "deepseek", phase: 180, amplitude: 1.0, frequency: 7, lastUpdate: Date.now(), health: "online" });
    this.arms.set("os", { name: "os", phase: 270, amplitude: 1.0, frequency: 12, lastUpdate: Date.now(), health: "online" });
    this.queen = { phase: 45, coherence: 1.0, angularMomentum: 1.0, torqueRedistribution: 0, timestamp: Date.now() };
  }

  updateArmState(armName: "qwen" | "gemma" | "deepseek" | "os", phase: number, amplitude: number, health: "online" | "degraded" | "offline"): void {
    const arm = this.arms.get(armName);
    if (!arm) return;
    arm.phase = phase % 360;
    arm.amplitude = Math.max(0, Math.min(1, amplitude));
    arm.health = health;
    arm.lastUpdate = Date.now();
    this.adjustPhaseCoherence();
  }

  private adjustPhaseCoherence(): void {
    const arms = Array.from(this.arms.values());
    const diffs = arms.map(a => Math.abs(this.angleDifference(a.phase, this.queen.phase)));
    const coherence = Math.max(0, 1 - (diffs.reduce((a, b) => a + b, 0) / arms.length) / 180);
    this.queen.coherence = coherence;
    this.coherenceHistory.push(coherence);
    if (this.coherenceHistory.length > 100) this.coherenceHistory.shift();
    this.queen.angularMomentum = arms.filter(a => a.health === "online").reduce((s, a) => s + a.amplitude, 0) / arms.length;
  }

  private angleDifference(a1: number, a2: number): number {
    let d = a1 - a2;
    while (d > 180) d -= 360;
    while (d < -180) d += 360;
    return d;
  }

  getReport(): PhaseLockReport {
    const arms = Array.from(this.arms.values());
    const onlineCount = arms.filter(a => a.health === "online").length;
    return {
      queen: this.queen,
      arms,
      systemHealth: onlineCount === 4 ? "optimal" : onlineCount >= 2 ? "degraded" : "critical",
      coherenceScore: this.coherenceHistory.length > 0 ? this.coherenceHistory.reduce((a, b) => a + b) / this.coherenceHistory.length : 1.0,
      wobbleDetected: false,
      selfCorrectionActive: false,
    };
  }

  selfCorrect(): void { this.adjustPhaseCoherence(); }
}

let instance: PhaseLockSynchronizer | null = null;
export function getPhaseLockSynchronizer(): PhaseLockSynchronizer {
  if (!instance) instance = new PhaseLockSynchronizer();
  return instance;
}
