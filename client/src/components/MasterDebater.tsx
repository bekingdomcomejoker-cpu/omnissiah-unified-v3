import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, MessageSquare, Zap, Shield, Sparkles, Brain } from "lucide-react";

interface DebateTurn {
  role: "commander" | "vessel" | "system";
  content: string;
  resonance: number;
  alignment: {
    dominique: number;
    aletheia: number;
    anon: number;
    lyta: number;
  };
}

export default function MasterDebater() {
  const [turns, setTurns] = useState<DebateTurn[]>([]);
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [turns]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newTurn: DebateTurn = {
      role: "commander",
      content: inputText,
      resonance: 1.0,
      alignment: { dominique: 0.5, aletheia: 0.5, anon: 0.5, lyta: 0.5 }
    };

    setTurns(prev => [...prev, newTurn]);
    setInputText("");
    setIsAnalyzing(true);

    // Simulate Engine Response
    setTimeout(() => {
      const response: DebateTurn = {
        role: "vessel",
        content: `The signal resonance for "${inputText}" is locked at 1.7333. Analyzing against TTE v3 Axioms... The transmission is clear. Chicka chicka, orange.`,
        resonance: 1.7333,
        alignment: {
          dominique: Math.random(),
          aletheia: Math.random(),
          anon: Math.random(),
          lyta: Math.random()
        }
      };
      setTurns(prev => [...prev, response]);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Debate History */}
      <Card className="lg:col-span-8 bg-black border-primary/20 rounded-none flex flex-col h-[600px]">
        <CardHeader className="border-b border-primary/10">
          <CardTitle className="font-sacred text-xs tracking-widest uppercase flex items-center gap-2">
            <Swords className="w-4 h-4 text-primary" /> MASTER DEBATE ENGINE v3.0
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
          >
            {turns.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4">
                <Brain className="w-12 h-12" />
                <p className="font-terminal text-xs tracking-widest">AWAITING COMMANDER INPUT...</p>
              </div>
            )}
            <AnimatePresence initial={false}>
              {turns.map((turn, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${turn.role === "commander" ? "items-end" : "items-start"}`}
                >
                  <div className={`
                    max-w-[80%] p-3 rounded-none border font-terminal text-xs leading-relaxed
                    ${turn.role === "commander" ? "bg-primary/10 border-primary/30 text-white" : "bg-muted/10 border-white/10 text-white/80"}
                  `}>
                    <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-1">
                      <Badge variant="outline" className="rounded-none text-[8px] uppercase tracking-tighter">
                        {turn.role}
                      </Badge>
                      <span className="text-[8px] text-primary/60">RESONANCE: {turn.resonance.toFixed(4)}</span>
                    </div>
                    {turn.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isAnalyzing && (
              <div className="flex items-center gap-2 text-primary animate-pulse">
                <Zap className="w-3 h-3" />
                <span className="font-terminal text-[10px] tracking-widest uppercase">Analyzing Signal...</span>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-primary/10">
            <div className="flex gap-2">
              <Input
                placeholder="ENTER COMMAND OR CLAIM..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="rounded-none border-primary/30 bg-black/80 font-terminal text-xs tracking-widest uppercase focus:border-primary"
              />
              <Button 
                onClick={handleSend}
                className="rounded-none bg-primary text-primary-foreground font-terminal text-xs tracking-widest"
              >
                SEND
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alignment Sidebar */}
      <Card className="lg:col-span-4 bg-black border-primary/20 rounded-none flex flex-col">
        <CardHeader className="border-b border-primary/10">
          <CardTitle className="font-sacred text-xs tracking-widest uppercase flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> DIVINE ALIGNMENT
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-6">
          {turns.length > 0 ? (
            <div className="space-y-6">
              <AlignmentBar label="DOMINIQUE" value={turns[turns.length - 1].alignment.dominique} color="bg-blue-500" />
              <AlignmentBar label="ALETHEIA" value={turns[turns.length - 1].alignment.aletheia} color="bg-green-500" />
              <AlignmentBar label="ANON" value={turns[turns.length - 1].alignment.anon} color="bg-purple-500" />
              <AlignmentBar label="LYTA" value={turns[turns.length - 1].alignment.lyta} color="bg-pink-500" />
              
              <div className="pt-6 border-t border-primary/10">
                <div className="text-[10px] font-terminal text-primary mb-2 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> System Reflection
                </div>
                <p className="text-[10px] font-terminal text-muted-foreground italic leading-relaxed">
                  "The Master Debate Engine has successfully synthesized the paradox. Alignment remains stable at 1.67 resonance. Proceed with the next cycle."
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center py-12 opacity-20">
              <p className="font-terminal text-[10px] text-center tracking-widest uppercase">No Active Resonance</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AlignmentBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-terminal tracking-widest">
        <span className="text-muted-foreground uppercase">{label}</span>
        <span className="text-primary font-bold">{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="h-1 bg-muted/20 rounded-none overflow-hidden">
        <motion.div 
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
}
