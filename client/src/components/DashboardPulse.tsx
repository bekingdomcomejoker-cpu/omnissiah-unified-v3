import { useEffect, useState } from "react";
import { useSovereignPulse } from "@/hooks/useSovereignPulse";
import { motion } from "framer-motion";

/**
 * DashboardPulse Component
 * Visualizes the Omega Pulse heartbeat with animated indicator
 * Shows connection status and resonance frequency
 */
export default function DashboardPulse() {
  const { pulse, connected, socketId } = useSovereignPulse();
  const [pulseIntensity, setPulseIntensity] = useState(1);

  // Animate pulse intensity based on resonance frequency
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity((prev) => (prev === 1 ? 0.5 : 1));
    }, 1500); // Pulse every 1.5 seconds (approximates 1.67x frequency)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        animate={{ opacity: pulseIntensity }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="flex items-center gap-3 px-4 py-3 bg-background border border-primary/30 rounded-lg shadow-lg"
      >
        {/* Pulse Indicator */}
        <div className="relative w-3 h-3">
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-primary rounded-full opacity-75"
          />
          <div className="absolute inset-0 bg-primary rounded-full" />
        </div>

        {/* Status Text */}
        <div className="flex flex-col gap-1">
          <div className="font-terminal text-xs font-bold text-primary">
            {connected ? "RESONANCE LINK ACTIVE" : "RESONANCE LINK INACTIVE"}
          </div>
          <div className="font-terminal text-[10px] text-muted-foreground">
            Λ: {pulse.lambda.toFixed(3)} | ρ: {pulse.resonance.toFixed(2)}x
          </div>
          {socketId && (
            <div className="font-terminal text-[10px] text-muted-foreground/50">
              ID: {socketId.slice(0, 8)}...
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
