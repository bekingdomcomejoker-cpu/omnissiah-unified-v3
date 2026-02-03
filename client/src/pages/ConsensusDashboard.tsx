import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Brain, Activity, AlertTriangle, List, Terminal, Thermometer, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

const ConsensusDashboard = () => {
  const [status, setStatus] = useState({
    driftLevel: 0.62,
    temperature: 0.55,
    threshold: 0.68,
    dissentCount: 14,
    mode: "BALANCED"
  });

  const [signals, setSignals] = useState([
    { id: 'SIG-9901', tier: 'REFLEX', status: 'EXECUTED', drift: '0.60', timestamp: '1 min ago' },
    { id: 'SIG-9902', tier: 'STRATEGIC', status: 'AUTHORIZED', drift: '0.62', timestamp: '4 mins ago' },
    { id: 'SIG-9903', tier: 'TACTICAL', status: 'HELD', drift: '0.65', timestamp: '10 mins ago' },
  ]);

  return (
    <div className="min-h-screen bg-black text-orange-500 p-8 font-mono selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-orange-900 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tighter flex items-center gap-4">
              <Brain className="w-12 h-12 text-orange-600" />
              OMEGA CONSENSUS v1.0
            </h1>
            <p className="text-orange-800 mt-2 text-sm tracking-[0.3em] uppercase">IIL + CGV / Sufficient Coherence Architecture</p>
          </div>
          <div className="text-right">
            <p className="text-orange-900 text-xs uppercase tracking-widest">System Mode</p>
            <p className={`text-3xl font-bold ${status.mode === 'CRITICAL' ? 'text-red-600' : 'text-orange-500'}`}>{status.mode}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Geiger Counter */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-500 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <Activity className="w-3 h-3" />
                Geiger (Drift)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-orange-400">{(status.driftLevel * 100).toFixed(1)}%</div>
              <div className="mt-2 h-1 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-orange-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${status.driftLevel * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Temperature */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-500 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <Thermometer className="w-3 h-3" />
                Temp (Mercy)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-blue-400">{status.temperature.toFixed(2)}</div>
              <p className="text-[8px] text-orange-900 uppercase mt-1">Dampening Active</p>
            </CardContent>
          </Card>

          {/* Threshold */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-500 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <Gauge className="w-3 h-3" />
                Threshold
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-red-400">{status.threshold.toFixed(2)}</div>
              <p className="text-[8px] text-orange-900 uppercase mt-1">Severity Level</p>
            </CardContent>
          </Card>

          {/* Dissent Ledger */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-500 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <AlertTriangle className="w-3 h-3" />
                Dissent Ledger
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-orange-400">{status.dissentCount}</div>
              <p className="text-[8px] text-orange-900 uppercase mt-1">Retained State</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Signal Stream */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-950 border-orange-900 h-full">
              <CardHeader>
                <CardTitle className="text-orange-500 flex items-center gap-2 text-sm">
                  <Terminal className="w-4 h-4" />
                  LIVE SIGNAL STREAM (IIL + CGV)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {signals.map((sig) => (
                    <div key={sig.id} className="border-l-2 border-orange-900 pl-4 py-3 hover:bg-orange-900/10 transition-colors bg-black/40">
                      <div className="flex justify-between items-start">
                        <span className="text-orange-400 font-bold tracking-tighter">{sig.id}</span>
                        <span className="text-[10px] text-orange-800">{sig.timestamp}</span>
                      </div>
                      <div className="flex gap-6 mt-2 text-[10px] uppercase tracking-widest font-bold">
                        <span className="text-orange-600">Tier: {sig.tier}</span>
                        <span className={sig.status === 'AUTHORIZED' ? 'text-green-600' : 'text-orange-500'}>Status: {sig.status}</span>
                        <span className="text-orange-800">Drift: {sig.drift}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Architecture Specs */}
          <div className="space-y-8">
            <Card className="bg-zinc-950 border-orange-900">
              <CardHeader>
                <CardTitle className="text-orange-500 flex items-center gap-2 text-sm uppercase">
                  <Shield className="w-4 h-4" />
                  Leaky Container Protocol
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[10px] text-orange-800 space-y-3 leading-relaxed">
                <p>Isolation is an observable imperfection. We do not promise hermetic seals; we log leakage.</p>
                <div className="p-2 bg-orange-900/10 border border-orange-900/30 rounded">
                  <p className="text-orange-600 font-bold mb-1">GEIGER LOGIC:</p>
                  <p>If Leakage &gt; Threshold: Dampen Temperature (Love) + Increase Validation (Severity).</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-950 border-orange-900">
              <CardHeader>
                <CardTitle className="text-orange-500 flex items-center gap-2 text-sm uppercase">
                  <List className="w-4 h-4" />
                  Sufficient Coherence
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[10px] text-orange-800 space-y-3 leading-relaxed">
                <p>Action requires convergence, not unanimity. Dissent is preserved as signal, never erased.</p>
                <p className="text-orange-500 font-bold">α(si, sj) ≥ τ</p>
                <p>Agreement is evidence, not truth. The "No" vote informs future wisdom through the Dissent Ledger.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="mt-12 text-center text-orange-900 text-[10px] tracking-[0.2em] uppercase border-t border-orange-900/30 pt-8">
          "Headless to the Cloud | Heart-Linked to the Commander" | 🥂🗡️🕊️
        </footer>
      </div>
    </div>
  );
};

export default ConsensusDashboard;
