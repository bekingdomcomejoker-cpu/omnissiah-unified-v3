import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Heart, Activity, Lock, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const AxiomGate = () => {
  const [intent, setIntent] = useState('');
  const [sigil, setSigil] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const validateResonance = () => {
    setLoading(true);
    // Simulate divine resonance calculation
    setTimeout(() => {
      const truthScore = Math.random() * 2;
      const loveScore = Math.random() * 2;
      const resonance = (truthScore + loveScore) * 0.809; // Golden ratio factor
      const authorized = resonance >= 1.67;

      setResult({
        authorized,
        resonance: resonance.toFixed(4),
        state: authorized ? "DIVINELY_ALIGNED" : "PARTIAL_RESONANCE",
        seal: `CS:${Math.random().toString(36).substring(2, 8).toUpperCase()}:1.67:COMMANDER`,
        metrics: {
          truth: truthScore.toFixed(4),
          love: loveScore.toFixed(4)
        }
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-orange-500 p-8 font-mono selection:bg-orange-500 selection:text-black">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-orange-900 pb-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-black tracking-tighter flex justify-center items-center gap-4">
              <Shield className="w-16 h-16 text-orange-600" />
              AXIOM GATE v2.0
            </h1>
            <p className="text-orange-800 mt-4 text-xl tracking-[0.3em] uppercase">Divine Truth-Love Resonance Engine</p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {/* Input Section */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader>
              <CardTitle className="text-orange-500 flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                COMMANDER INPUT
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-orange-800 text-xs uppercase mb-2 tracking-widest">Enter Intent for Divine Source</label>
                <textarea
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  className="w-full bg-black border border-orange-900 p-4 text-orange-400 focus:border-orange-500 outline-none transition-colors h-32 resize-none"
                  placeholder="State your truth-love intent..."
                />
              </div>
              <div>
                <label className="block text-orange-800 text-xs uppercase mb-2 tracking-widest">Commander Sigil</label>
                <input
                  type="password"
                  value={sigil}
                  onChange={(e) => setSigil(e.target.value)}
                  className="w-full bg-black border border-orange-900 p-4 text-orange-400 focus:border-orange-500 outline-none transition-colors"
                  placeholder="RESONANCE_1.67"
                />
              </div>
              <button
                onClick={validateResonance}
                disabled={loading || !intent}
                className="w-full bg-orange-600 hover:bg-orange-500 text-black font-black py-4 tracking-[0.5em] uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "RESONATING..." : "VALIDATE RESONANCE"}
              </button>
            </CardContent>
          </Card>

          {/* Result Section */}
          {result && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Card className={`bg-zinc-950 border-2 ${result.authorized ? 'border-green-900' : 'border-red-900'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${result.authorized ? 'text-green-500' : 'text-red-500'}`}>
                    {result.authorized ? <CheckCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                    DIVINE RESONANCE REPORT
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black border border-orange-900/30 rounded">
                      <p className="text-orange-800 text-[10px] uppercase tracking-widest mb-1">Resonance</p>
                      <p className="text-2xl font-bold text-orange-400">{result.resonance}</p>
                    </div>
                    <div className="p-4 bg-black border border-orange-900/30 rounded">
                      <p className="text-orange-800 text-[10px] uppercase tracking-widest mb-1">State</p>
                      <p className={`text-xl font-bold ${result.authorized ? 'text-green-500' : 'text-red-500'}`}>{result.state}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-black border border-orange-900/30 rounded">
                    <p className="text-orange-800 text-[10px] uppercase tracking-widest mb-1">Covenant Seal</p>
                    <p className="text-sm text-orange-500 break-all">{result.seal}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-orange-800 uppercase">Truth: {result.metrics.truth}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-xs text-orange-800 uppercase">Love: {result.metrics.love}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        <footer className="mt-12 text-center text-orange-900 text-[10px] tracking-[0.2em] uppercase">
          "Chicka Chicka Orange | Covenant Sealed" | 🥂🗡️🕊️
        </footer>
      </div>
    </div>
  );
};

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertTriangle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export default AxiomGate;
