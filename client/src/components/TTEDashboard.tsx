import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Dna, Zap, Shield, Database, Plus, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TTEDashboard() {
  const [alphabet, setAlphabet] = useState("");
  const [math, setMath] = useState("");
  
  const encodeMutation = trpc.tte.encodeBond.useMutation();
  const { data: spiral, refetch } = trpc.tte.getSpiral.useQuery();

  const handleEncode = async () => {
    if (!alphabet.trim() || !math.trim()) return;
    await encodeMutation.mutateAsync({ alphabet, math });
    setAlphabet("");
    setMath("");
    refetch();
  };

  return (
    <div className="space-y-8">
      <Card className="border-primary/20 bg-muted/10 rounded-none">
        <CardHeader>
          <CardTitle className="font-sacred text-xl flex items-center gap-2">
            <Dna className="text-primary animate-pulse" /> TRINITY TRUTH ENGINE v5.0
          </CardTitle>
          <CardDescription className="font-terminal text-xs">
            Aletheia DNA Spiral: Alphabet (Command) + Math (Law) + Spirit (Unknowing)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-terminal text-[10px] text-primary uppercase tracking-widest">Alphabet Strand (The Command)</label>
              <Textarea 
                placeholder="Enter an Alphabet/Word concept..."
                value={alphabet}
                onChange={(e) => setAlphabet(e.target.value)}
                className="rounded-none border-primary/30 bg-background font-terminal text-sm h-24"
              />
            </div>
            <div className="space-y-2">
              <label className="font-terminal text-[10px] text-primary uppercase tracking-widest">Math Strand (The Law)</label>
              <Textarea 
                placeholder="Enter a Math/Logic concept..."
                value={math}
                onChange={(e) => setMath(e.target.value)}
                className="rounded-none border-primary/30 bg-background font-terminal text-sm h-24"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleEncode} 
            disabled={encodeMutation.isPending}
            className="w-full rounded-none bg-primary text-primary-foreground font-terminal text-xs tracking-widest h-12"
          >
            {encodeMutation.isPending ? "ENCODING DNA HELIX..." : "ENCODE DNA HELIX (ALETHEIA BOND)"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-sacred text-2xl text-center flex items-center justify-center gap-2">
          <Zap className="text-primary" /> THE ALETHEIA SPIRAL
        </h3>
        
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {spiral?.slice().reverse().map((bond, index) => (
            <motion.div
              key={bond.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative p-6 border border-primary/20 bg-background/50 group hover:border-primary/50 transition-colors"
            >
              <div className="absolute top-0 right-0 p-2">
                <Badge variant="outline" className="font-terminal text-[8px] border-primary/20 rounded-none">
                  BOND #{spiral.length - index}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-3 border-l-2 border-blue-500 bg-blue-500/5">
                  <div className="font-terminal text-[8px] text-blue-400 mb-1">ALPHABET STRAND</div>
                  <div className="font-terminal text-xs">{bond.lambda === "1.618" ? "Encoded Concept" : "Legacy Pulse"}</div>
                </div>
                <div className="p-3 border-l-2 border-green-500 bg-green-500/5">
                  <div className="font-terminal text-[8px] text-green-400 mb-1">MATH STRAND</div>
                  <div className="font-terminal text-xs">{bond.resonance}</div>
                </div>
              </div>
              
              <div className="p-3 border border-purple-500/30 bg-purple-500/5 text-center">
                <div className="font-terminal text-[8px] text-purple-400 mb-1">ALETHEIA BOND (THE SPIRIT)</div>
                <div className="font-terminal text-xs italic text-purple-200">
                  {bond.status === "ALETHEIA_BOND" ? "The Unconcealed Bond of Truth and Law" : "Resonance Pulse Detected"}
                </div>
              </div>
              
              <div className="mt-2 flex justify-between items-center font-terminal text-[8px] text-muted-foreground">
                <span>ARCHITECT: {bond.socketId?.substring(0, 12)}...</span>
                <span>{new Date(bond.timestamp).toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
          
          {(!spiral || spiral.length === 0) && (
            <div className="text-center py-12 border border-dashed border-border">
              <p className="font-terminal text-xs text-muted-foreground italic">No Aletheia Bonds defined yet. Start the Spiral.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
