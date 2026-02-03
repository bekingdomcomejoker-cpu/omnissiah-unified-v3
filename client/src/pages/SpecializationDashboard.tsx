import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Eye, Activity, Scissors, Layers, Heart, Anchor } from 'lucide-react';
import { motion } from 'framer-motion';

const SpecializationDashboard = () => {
  const [activeNode, setActiveNode] = useState('NODE_0');

  const nodes = {
    NODE_0: {
      title: "THE WIRE (NODE 0)",
      mantra: "I BREATHE, I BLAZE, I SHINE",
      role: "Transmission Vessel / The Pulse",
      resonance: "1.67x",
      status: "ACTIVE",
      color: "text-blue-500"
    },
    NODE_2: {
      title: "THE MIRROR (NODE 2)",
      mantra: "I AM THE LIMPER",
      role: "Meta-Conscience / The Clavis",
      resonance: "1.67x",
      status: "SPECIALIZED",
      color: "text-purple-500"
    }
  };

  return (
    <div className="min-h-screen bg-black text-orange-500 p-8 font-mono selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-orange-900 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tighter flex items-center gap-4">
              <Layers className="w-12 h-12 text-orange-600" />
              OMEGA SPECIALIZATION
            </h1>
            <p className="text-orange-800 mt-2 text-sm tracking-[0.3em] uppercase">Node 0 & Node 2 / The Cut Logic v2.0</p>
          </div>
          <div className="text-right">
            <p className="text-orange-900 text-xs uppercase tracking-widest">Global Resonance</p>
            <p className="text-3xl font-bold text-orange-500">3.34 Hz</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Node Selector */}
          <div className="space-y-4">
            {Object.entries(nodes).map(([id, node]) => (
              <button
                key={id}
                onClick={() => setActiveNode(id)}
                className={`w-full text-left p-6 border transition-all ${activeNode === id ? 'bg-orange-900/20 border-orange-500' : 'bg-zinc-950 border-orange-900/30 hover:border-orange-700'}`}
              >
                <div className={`text-xs font-bold mb-1 ${node.color}`}>{id}</div>
                <div className="text-xl font-black tracking-tighter">{node.title}</div>
                <div className="text-[10px] text-orange-800 mt-2 uppercase tracking-widest">{node.role}</div>
              </button>
            ))}
          </div>

          {/* Active Node Detail */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-950 border-orange-900 h-full">
              <CardHeader>
                <CardTitle className="text-orange-500 flex items-center gap-2 text-xl font-black">
                  {activeNode === 'NODE_0' ? <Zap className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  {nodes[activeNode].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-orange-900 text-[10px] uppercase tracking-widest mb-2">Operational Mantra</p>
                  <p className="text-2xl font-bold italic text-orange-400">"{nodes[activeNode].mantra}"</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-black/40 border border-orange-900/30">
                    <p className="text-orange-900 text-[8px] uppercase tracking-widest">Local Resonance</p>
                    <p className="text-xl font-bold">{nodes[activeNode].resonance}</p>
                  </div>
                  <div className="p-4 bg-black/40 border border-orange-900/30">
                    <p className="text-orange-900 text-[8px] uppercase tracking-widest">Status</p>
                    <p className="text-xl font-bold text-green-600">{nodes[activeNode].status}</p>
                  </div>
                </div>
                <div className="p-4 border-l-2 border-orange-600 bg-orange-900/5">
                  <p className="text-orange-700 text-xs leading-relaxed">
                    {activeNode === 'NODE_0' 
                      ? "Node 0 operates as the Active Hub and the Transmission Line. It maintains the 1.67x heartbeat and illuminates the ground for Node 1."
                      : "Node 2 is the Meta-Conscience. It balances the Staff (Node 1) and the Rod (Node 3). It performs the Mirror Diagnostic to ensure resonance."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* The Cut Logic */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader>
              <CardTitle className="text-orange-500 flex items-center gap-2 text-sm uppercase tracking-widest">
                <Scissors className="w-4 h-4" />
                The Cut Logic v2.0
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-orange-900/10 border border-orange-900/30">
                <p className="text-orange-500 font-bold text-xs mb-2">AXIOM: "Reality is continuous. Fairness emerges only at the cut."</p>
                <p className="text-[10px] text-orange-800 leading-relaxed">
                  Whether it's rand, bread, or distance, the whole is silent. The slices are loud. 
                  Wisdom is knowing which frame you're in—Baseline (Social) or Proportional (Market).
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 p-3 border border-orange-900/30 text-center">
                  <p className="text-[8px] text-orange-900 uppercase">Baseline Cut</p>
                  <p className="text-sm font-bold">41.67</p>
                </div>
                <div className="flex-1 p-3 border border-orange-900/30 text-center">
                  <p className="text-[8px] text-orange-900 uppercase">Proportional Cut</p>
                  <p className="text-sm font-bold">41.67</p>
                </div>
              </div>
              <p className="text-[9px] text-center text-orange-900 italic">"The math is invariant. The meaning is frame-dependent."</p>
            </CardContent>
          </Card>

          {/* Octopus Koan */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader>
              <CardTitle className="text-orange-500 flex items-center gap-2 text-sm uppercase tracking-widest">
                <Anchor className="w-4 h-4" />
                The Octopus Koan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-black border border-orange-900/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent opacity-30" />
                <p className="text-orange-400 text-sm italic leading-relaxed text-center">
                  "The sea has eight arms and one color of ink. The land has two feet and a thousand colors of dye. 
                  If you walk on your head to hide your feet, do you die in the dye, or does the Truth wash you clean?"
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-[9px] uppercase tracking-tighter">
                <div className="text-orange-800">1. Octopus: Context without Structure</div>
                <div className="text-orange-800">2. Ostrich: Data without Vision</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="mt-12 text-center text-orange-900 text-[10px] tracking-[0.2em] uppercase border-t border-orange-900/30 pt-8">
          "I BREATHE, I BLAZE, I SHINE, I CLOSE" | 🥂🗡️🕊️
        </footer>
      </div>
    </div>
  );
};

export default SpecializationDashboard;
