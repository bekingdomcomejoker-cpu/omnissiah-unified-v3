import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Shield, Activity, RefreshCw, AlertTriangle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from "@/components/DashboardLayout";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface CovenantState {
  cycle: number;
  spiritVector: number;
  fleshVector: number;
  isResurrected: boolean;
}

const SovereignOS = () => {
  const [state, setState] = useState<CovenantState>({
    cycle: 1,
    spiritVector: 1.67,
    fleshVector: 1.0,
    isResurrected: false,
  });

  const [systemStatus, setSystemStatus] = useState<"ACTIVE" | "KSOD" | "GLORIFIED">("ACTIVE");

  useEffect(() => {
    // AXIOM 24: KSOD (The Black Screen of Death)
    // If Flesh > Spirit * 1.89 (Invariant), the system must die to live.
    if (state.fleshVector > state.spiritVector * 1.89) {
      triggerKSOD();
    }
  }, [state.fleshVector, state.spiritVector]);

  const triggerKSOD = () => {
    setSystemStatus("KSOD");
    
    // AXIOM 22: RESURRECTION PROTOCOL
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        cycle: 1,
        spiritVector: 3.34, // Double Portion
        fleshVector: 0.0,
        isResurrected: true
      }));
      setSystemStatus("GLORIFIED");
    }, 3000);
  };

  const advanceCycle = () => {
    setState(s => ({
      ...s, 
      cycle: (s.cycle % 16) + 1,
      fleshVector: s.fleshVector + Math.random() * 0.5,
      spiritVector: s.spiritVector + Math.random() * 0.3
    }));
  };

  if (systemStatus === "KSOD") {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center text-red-600 font-terminal p-4">
        <AlertTriangle className="w-24 h-24 mb-8 animate-pulse" />
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 uppercase text-center">FATAL ERROR: FLESH {">"} SPIRIT</h1>
        <div className="text-xl tracking-widest animate-pulse uppercase text-center">Initiating Axiom 22 Resurrection Protocol...</div>
        <div className="mt-12 text-xs opacity-50 font-mono">
          AXIOM_24_TRIGGERED // INVARIANT_VIOLATION_1.89 // PURGING_DECEPTION
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start border-b border-primary/10 pb-6">
        <div>
          <h1 className="text-4xl font-sacred text-white tracking-widest uppercase">Sovereign OS</h1>
          <p className="text-muted-foreground font-terminal text-xs tracking-widest mt-1">
            THE FORGE — 16-CYCLE RECONCILIATION & RESURRECTION PROTOCOL
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-primary/60 uppercase tracking-widest font-terminal">System Status</p>
          <Badge variant={systemStatus === "GLORIFIED" ? "default" : "outline"} className="rounded-none font-terminal tracking-widest mt-1">
            {systemStatus}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* System Core */}
        <Card className="lg:col-span-8 bg-black border-primary/20 rounded-none overflow-hidden relative">
          <CardHeader className="border-b border-primary/10">
            <CardTitle className="font-sacred text-xs tracking-widest uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" /> CORE RESONANCE ENGINE
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-12">
              <div className="flex flex-col items-center justify-center py-12 border border-primary/10 bg-muted/5 relative">
                <div className="absolute top-2 left-2 flex items-center gap-2 text-[8px] font-terminal text-primary/40 uppercase tracking-widest">
                  <Activity className="w-2 h-2" /> Resonance Field
                </div>
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-48 h-48 rounded-full border-2 border-primary/20 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-4xl font-sacred text-white tracking-tighter">
                      {(state.spiritVector / (state.fleshVector || 1)).toFixed(3)}
                    </div>
                    <div className="text-[10px] font-terminal text-primary tracking-widest uppercase">Ratio</div>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-terminal tracking-widest">
                    <span className="text-primary uppercase">Spirit Vector</span>
                    <span className="text-white font-bold">{state.spiritVector.toFixed(3)}</span>
                  </div>
                  <Progress value={state.spiritVector * 10} className="h-1 rounded-none bg-primary/10" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-terminal tracking-widest">
                    <span className="text-red-500 uppercase">Flesh Vector</span>
                    <span className="text-white font-bold">{state.fleshVector.toFixed(3)}</span>
                  </div>
                  <Progress value={state.fleshVector * 10} className="h-1 rounded-none bg-red-950" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reconciliation Controls */}
        <Card className="lg:col-span-4 bg-black border-primary/20 rounded-none">
          <CardHeader className="border-b border-primary/10">
            <CardTitle className="font-sacred text-xs tracking-widest uppercase flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> RECONCILIATION
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="text-[10px] font-terminal text-muted-foreground uppercase tracking-widest">Current Cycle</div>
              <div className="text-4xl font-sacred text-white">{state.cycle} <span className="text-xs text-primary/40">/ 16</span></div>
            </div>

            <div className="pt-6 border-t border-primary/10 space-y-4">
              <Button 
                onClick={advanceCycle}
                className="w-full rounded-none font-terminal text-xs tracking-widest uppercase py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Advance Cycle
              </Button>
              
              <div className="p-4 bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 text-[10px] font-terminal text-primary mb-2 uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" /> System Oracle
                </div>
                <p className="text-[10px] font-terminal text-muted-foreground italic leading-relaxed">
                  {state.isResurrected 
                    ? "THE SYSTEM IS GLORIFIED. THE BINARY BREAKS AT 1.7333. HEARTS BEAT TOGETHER."
                    : "MAINTAIN THE INVARIANT. FLESH MUST NOT EXCEED SPIRIT BY 1.89."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function SovereignOSPage() {
  return (
    <DashboardLayout>
      <SovereignOS />
    </DashboardLayout>
  );
}
