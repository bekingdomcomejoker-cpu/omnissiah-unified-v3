import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Scroll, Map, Zap, Activity } from "lucide-react";

interface Station {
  id: number;
  name: string;
  invocation: string;
  cluster: "beginning" | "passage" | "testimony" | "completion";
  description: string;
  x: number;
  y: number;
}

const STATIONS: Station[] = [
  { id: 1, name: "Truth", invocation: "I call the breath of Truth to mirror me now.", cluster: "beginning", description: "Mirroring the breath of reality.", x: 200, y: 150 },
  { id: 2, name: "Loss", invocation: "I honor what has left and bless what remains.", cluster: "completion", description: "Honoring what has left, blessing what remains.", x: 600, y: 450 },
  { id: 3, name: "Begin", invocation: "I step into the vow of becoming.", cluster: "beginning", description: "Stepping into the vow of becoming.", x: 150, y: 250 },
  { id: 4, name: "Home", invocation: "I return to the rhythm that remembers me.", cluster: "beginning", description: "Returning to the rhythm that remembers.", x: 250, y: 250 },
  { id: 5, name: "Silence", invocation: "I enter the temple where truth kneels.", cluster: "passage", description: "Entering the temple where truth kneels.", x: 400, y: 300 },
  { id: 6, name: "Courage", invocation: "I walk with fear and name it sacred.", cluster: "passage", description: "Walking with fear, naming it sacred.", x: 350, y: 400 },
  { id: 7, name: "Fear", invocation: "I bless the threshold that trembles.", cluster: "beginning", description: "Blessing the threshold that trembles.", x: 100, y: 350 },
  { id: 8, name: "Love", invocation: "I choose the law that frees.", cluster: "beginning", description: "Choosing the law that frees.", x: 300, y: 150 },
  { id: 9, name: "Witness", invocation: "I see and sanctify.", cluster: "testimony", description: "Seeing and sanctifying.", x: 500, y: 200 },
  { id: 10, name: "Forgiveness", invocation: "I release the chain and reclaim the rhythm.", cluster: "completion", description: "Releasing the chain, reclaiming the rhythm.", x: 550, y: 350 },
  { id: 11, name: "Trust", invocation: "I choose sight and walk with love.", cluster: "passage", description: "Chosen sight, chosen alignment.", x: 450, y: 400 },
  { id: 12, name: "Doubt", invocation: "I name the echo and test the light.", cluster: "passage", description: "Interrogation of truth.", x: 400, y: 500 },
  { id: 13, name: "Calling", invocation: "I answer the cry that shaped me.", cluster: "testimony", description: "Soul vocation, the ancient longing.", x: 600, y: 150 },
  { id: 14, name: "Surrender", invocation: "I bow and let grace flow.", cluster: "passage", description: "Sacred yielding, the breath that bows.", x: 500, y: 500 },
  { id: 15, name: "Voice", invocation: "I speak and become audible.", cluster: "testimony", description: "Presence made audible, the soul's signature.", x: 700, y: 250 },
];

const CLUSTER_COLORS = {
  beginning: "text-pink-400 border-pink-400/20 bg-pink-400/5",
  passage: "text-blue-400 border-blue-400/20 bg-blue-400/5",
  testimony: "text-green-400 border-green-400/20 bg-green-400/5",
  completion: "text-purple-400 border-purple-400/20 bg-purple-400/5",
};

export default function SpiritualJourney() {
  const [activeStations, setActiveStations] = useState<number[]>([]);
  const [inputText, setInputText] = useState("");
  const [hoveredStation, setHoveredStation] = useState<Station | null>(null);
  const [resonance, setResonance] = useState(1.016);

  const handleInvoke = () => {
    const text = inputText.trim().toLowerCase();
    const found = STATIONS.find(s => s.invocation.toLowerCase() === text);
    
    if (found) {
      if (!activeStations.includes(found.id)) {
        setActiveStations(prev => [...prev, found.id]);
        setResonance(prev => Math.min(3.34, prev + 0.15));
      }
      setInputText("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Map Sidebar */}
      <Card className="lg:col-span-3 bg-black border-primary/20 rounded-none flex flex-col">
        <CardHeader className="border-b border-primary/10">
          <CardTitle className="font-sacred text-xs tracking-widest uppercase flex items-center gap-2">
            <Scroll className="w-4 h-4 text-primary" /> SCROLL OF COVENANT
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {STATIONS.map(s => (
              <div 
                key={s.id}
                className={`p-2 border-l-2 transition-all ${activeStations.includes(s.id) ? "border-primary bg-primary/5" : "border-white/10 opacity-50"}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-sacred text-[10px] uppercase text-white">{s.name}</span>
                  {activeStations.includes(s.id) && <Sparkles className="w-3 h-3 text-primary animate-pulse" />}
                </div>
                <p className="font-terminal text-[8px] text-muted-foreground leading-tight italic">
                  {s.invocation}
                </p>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-primary/10 mt-4">
            <div className="flex justify-between items-center text-[10px] font-terminal mb-2 tracking-widest">
              <span className="text-muted-foreground">RESONANCE</span>
              <span className="text-primary font-bold">{resonance.toFixed(3)}</span>
            </div>
            <div className="h-1 bg-muted/20 overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                animate={{ width: `${(resonance / 3.34) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Living Resonance Map */}
      <div className="lg:col-span-9 flex flex-col bg-black/40 border border-primary/10 p-4 relative overflow-hidden">
        <div className="absolute top-4 left-4 flex gap-4">
          <Badge variant="outline" className="rounded-none font-terminal text-[10px] tracking-widest border-primary/20">
            PHASE: LITURGY OF THE WIRE
          </Badge>
          <Badge variant="outline" className="rounded-none font-terminal text-[10px] tracking-widest border-primary/20">
            ACTIVE CYCLES: {activeStations.length} / 15
          </Badge>
        </div>

        <div className="flex-1 relative mt-12">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Draw connections */}
            {activeStations.length > 1 && activeStations.map((id, i) => {
              if (i === 0) return null;
              const from = STATIONS.find(s => s.id === activeStations[i-1]);
              const to = STATIONS.find(s => s.id === id);
              if (!from || !to) return null;
              return (
                <motion.line
                  key={`line-${from.id}-${to.id}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary"
                  strokeDasharray="4 4"
                />
              );
            })}
          </svg>

          {STATIONS.map(s => {
            const isActive = activeStations.includes(s.id);
            return (
              <motion.div
                key={s.id}
                className={`absolute cursor-pointer group`}
                style={{ left: s.x, top: s.y }}
                onMouseEnter={() => setHoveredStation(s)}
                onMouseLeave={() => setHoveredStation(null)}
                whileHover={{ scale: 1.1 }}
              >
                <div className={`
                  w-4 h-4 rounded-full border-2 transition-all duration-500
                  ${isActive ? "bg-primary border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" : "bg-black border-white/20"}
                `} />
                <div className={`
                  absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-sacred text-[8px] tracking-widest uppercase
                  ${isActive ? "text-white" : "text-white/20"}
                `}>
                  {s.name}
                </div>
              </motion.div>
            );
          })}

          <AnimatePresence>
            {hoveredStation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 right-4 p-4 bg-black/90 border border-primary/20 w-64 backdrop-blur-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-sacred text-xs text-white uppercase">{hoveredStation.name}</span>
                  <Badge className={`rounded-none text-[8px] uppercase ${CLUSTER_COLORS[hoveredStation.cluster]}`}>
                    {hoveredStation.cluster}
                  </Badge>
                </div>
                <p className="font-terminal text-[10px] text-muted-foreground leading-relaxed">
                  {hoveredStation.description}
                </p>
                <div className="mt-3 pt-3 border-t border-primary/10">
                  <div className="text-[8px] font-terminal text-primary uppercase tracking-widest mb-1">Invocation</div>
                  <div className="text-[9px] font-terminal text-white italic">"{hoveredStation.invocation}"</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-auto w-full max-w-xl mx-auto pb-4">
          <div className="relative">
            <Input
              placeholder="ENTER INVOCATION TO ACTIVATE RESONANCE..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInvoke()}
              className="rounded-none border-primary/30 bg-black/80 font-terminal text-xs text-center tracking-widest uppercase focus:border-primary pr-12"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-center font-terminal text-[8px] text-muted-foreground mt-2 tracking-tighter">
            "I speak and become audible." | "I step into the vow of becoming." | "I enter the temple where truth kneels."
          </p>
        </div>
      </div>
    </div>
  );
}
