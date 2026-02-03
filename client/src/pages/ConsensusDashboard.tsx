import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Brain, Activity, AlertTriangle, List, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const ConsensusDashboard = () => {
  const [status, setStatus] = useState({
    leakageLevel: 0.12,
    dissentCount: 4,
    resonance: 3.34
  });

  const [signals, setSignals] = useState([
    { id: 'SIG-8821', tier: 'REFLEX', status: 'EXECUTED', confidence: 1.0, timestamp: '2 mins ago' },
    { id: 'SIG-8822', tier: 'TACTICAL', status: 'AUTHORIZED', confidence: 2.4, timestamp: '5 mins ago' },
    { id: 'SIG-8823', tier: 'TACTICAL', status: 'HELD', confidence: 0.8, timestamp: '12 mins ago' },
  ]);

  return (
    <div className="min-h-screen bg-black text-orange-500 p-8 font-mono selection:bg-orange-500 selection:text-black">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-orange-900 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tighter flex items-center gap-4">
              <Brain className="w-12 h-12 text-orange-600" />
              OMEGA CONSENSUS
            </h1>
            <p className="text-orange-800 mt-2 text-sm tracking-[0.3em] uppercase">Sufficient Coherence Architecture v1.0</p>
          </div>
          <div className="text-right">
            <p className="text-orange-900 text-xs uppercase tracking-widest">System Resonance</p>
            <p className="text-3xl font-bold text-orange-500">3.34 Hz</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Geiger Counter */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader>
              <CardTitle className="text-orange-500 flex items-center gap-2 text-sm">
                <Activity className="w-4 h-4" />
                GEIGER COUNTER (LEAKAGE)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-4 bg-zinc-900 rounded-full overflow-hidden border border-orange-900/30">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-orange-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${status.leakageLevel * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-orange-800 uppercase tracking-tighter">
                <span>Stable</span>
                <span>{(status.leakageLevel * 100).toFixed(2)}% Leakage</span>
                <span>Critical</span>
              </div>
            </CardContent>
          </Card>

          {/* Dissent Ledger */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader>
              <CardTitle className="text-orange-500 flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4" />
                DISSENT LEDGER
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-orange-400">{status.dissentCount}</div>
              <p className="text-orange-800 text-[10px] uppercase tracking-widest mt-1">Retained Minority Reports</p>
            </CardContent>
          </Card>

          {/* Quorum Status */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader>
              <CardTitle className="text-orange-500 flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4" />
                QUORUM STATUS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600 uppercase">Trinity Lock</div>
              <p className="text-orange-800 text-[10px] uppercase tracking-widest mt-1">Active Consensus Mode</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Signal Stream */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader>
              <CardTitle className="text-orange-500 flex items-center gap-2 text-sm">
                <Terminal className="w-4 h-4" />
                SIGNAL STREAM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {signals.map((sig) => (
                  <div key={sig.id} className="border-l-2 border-orange-900 pl-4 py-2 hover:bg-orange-900/10 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className="text-orange-400 font-bold">{sig.id}</span>
                      <span className="text-[10px] text-orange-800">{sig.timestamp}</span>
                    </div>
                    <div className="flex gap-4 mt-1 text-[10px] uppercase tracking-widest">
                      <span className="text-orange-600">{sig.tier}</span>
                      <span className={sig.status === 'AUTHORIZED' ? 'text-green-600' : 'text-orange-500'}>{sig.status}</span>
                      <span className="text-orange-800">Conf: {sig.confidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Consensus Logic Map */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader>
              <CardTitle className="text-orange-500 flex items-center gap-2 text-sm">
                <List className="w-4 h-4" />
                CONSENSUS LOGIC MAP
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[11px] text-orange-700 space-y-2 leading-relaxed">
              <p><span className="text-orange-500 font-bold">REFLEX:</span> Single witness or pre-authorized pattern. Latency budget &lt; 50ms.</p>
              <p><span className="text-orange-500 font-bold">TACTICAL:</span> Two or three witnesses required. Sufficient coherence threshold: Affirmative &gt; Dissent * 1.5.</p>
              <p><span className="text-orange-500 font-bold">STRATEGIC:</span> Full council deliberation. Dissent is never deleted; it is archived as retained state for future wisdom.</p>
              <div className="mt-4 p-3 bg-orange-900/10 border border-orange-900/30 rounded italic">
                "Action does not require total consensus. It requires sufficient coherence across independent parts."
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="mt-12 text-center text-orange-900 text-[10px] tracking-[0.2em] uppercase">
          "The No is preserved | Sufficient Coherence" | 🥂🗡️🕊️
        </footer>
      </div>
    </div>
  );
};

export default ConsensusDashboard;
