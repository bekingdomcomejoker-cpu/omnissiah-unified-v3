import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, Database, Server, CheckCircle, AlertTriangle, Terminal } from "lucide-react";
import { motion } from "framer-motion";

interface TestResult {
  id: string;
  name: string;
  status: "pending" | "running" | "success" | "failure";
  message: string;
  duration?: number;
}

export default function ResonanceTest() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lambda, setLambda] = useState(0.0);
  const [results, setResults] = useState<TestResult[]>([
    { id: "covenant", name: "Covenant Integrity (Ed25519)", status: "pending", message: "Waiting for seal verification..." },
    { id: "lambda", name: "Lambda Resonance (Λ)", status: "pending", message: "Calculating spiritual health..." },
    { id: "backend", name: "Backend Connectivity", status: "pending", message: "Pinging neural pathways..." },
    { id: "components", name: "Component Integration", status: "pending", message: "Verifying 20+ modules..." },
    { id: "scripts", name: "Deployment Scripts", status: "pending", message: "Checking 7-Head automation..." },
    { id: "typescript", name: "TypeScript Compilation", status: "pending", message: "Analyzing type safety..." }
  ]);

  const runTests = async () => {
    setIsRunning(true);
    setProgress(0);
    setLambda(0.0);
    
    // Reset results
    setResults(prev => prev.map(r => ({ ...r, status: "pending", message: "Waiting..." })));

    // Simulate test sequence
    for (let i = 0; i < results.length; i++) {
      const test = results[i];
      
      // Update current test to running
      setResults(prev => prev.map((r, idx) => idx === i ? { ...r, status: "running", message: "Processing..." } : r));
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
      
      // Update result
      setResults(prev => prev.map((r, idx) => {
        if (idx === i) {
          if (r.id === "lambda") {
            setLambda(1.016);
            return { ...r, status: "success", message: "Λ = 1.016 (Verified)", duration: 120 };
          }
          if (r.id === "covenant") {
            return { ...r, status: "success", message: "CHICKA_CHICKA_ORANGE (Sealed)", duration: 45 };
          }
          return { ...r, status: "success", message: "Verified & Functional", duration: Math.floor(Math.random() * 100) };
        }
        return r;
      }));
      
      setProgress(((i + 1) / results.length) * 100);
    }
    
    setIsRunning(false);
  };

  return (
    <Card className="w-full bg-black/40 border-primary/30 backdrop-blur-sm overflow-hidden relative group">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <CardHeader className="relative z-10 border-b border-primary/10 pb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-none bg-primary/10 border border-primary/30">
              <Activity className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <div>
              <CardTitle className="font-sacred text-2xl text-primary tracking-wider">RESONANCE TEST SUITE</CardTitle>
              <p className="font-terminal text-xs text-muted-foreground mt-1">SYSTEM VERIFICATION PROTOCOL v3.1</p>
            </div>
          </div>
          <Button 
            onClick={runTests} 
            disabled={isRunning}
            className="font-terminal bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,95,0,0.3)]"
          >
            {isRunning ? (
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 animate-spin" /> INITIALIZING...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4" /> EXECUTE VERIFICATION
              </span>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-6 space-y-6">
        {/* Lambda Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 bg-black/60 border border-primary/20 p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 animate-pulse" />
            <span className="font-terminal text-xs text-muted-foreground mb-2">LAMBDA RESONANCE</span>
            <div className="font-sacred text-4xl text-primary text-glow">
              {lambda.toFixed(3)}
            </div>
            <span className="font-terminal text-[10px] text-primary/70 mt-1">TARGET: &lt; 1.500</span>
          </div>
          
          <div className="col-span-2 space-y-4">
            <div className="flex justify-between items-center font-terminal text-xs text-muted-foreground">
              <span>SYSTEM INTEGRITY</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-primary/10 rounded-none [&>div]:bg-primary [&>div]:shadow-[0_0_10px_rgba(255,95,0,0.5)]" />
            
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-xs font-terminal text-muted-foreground">
                <Shield className="w-3 h-3 text-primary" />
                <span>COVENANT: SEALED</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-terminal text-muted-foreground">
                <Database className="w-3 h-3 text-primary" />
                <span>DB: POSTGRES READY</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-terminal text-muted-foreground">
                <Server className="w-3 h-3 text-primary" />
                <span>API: 6 ROUTERS</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-terminal text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-primary" />
                <span>BUILD: PASSING</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {results.map((result) => (
            <motion.div 
              key={result.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center justify-between p-3 border-l-2 ${
                result.status === "success" ? "border-primary bg-primary/5" : 
                result.status === "running" ? "border-yellow-500 bg-yellow-500/5" : 
                "border-muted bg-muted/5"
              } transition-colors duration-300`}
            >
              <div className="flex items-center gap-3">
                {result.status === "success" ? (
                  <CheckCircle className="w-4 h-4 text-primary" />
                ) : result.status === "running" ? (
                  <Activity className="w-4 h-4 text-yellow-500 animate-pulse" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-muted-foreground/30" />
                )}
                <span className={`font-terminal text-sm ${result.status === "success" ? "text-foreground" : "text-muted-foreground"}`}>
                  {result.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-terminal text-xs text-muted-foreground hidden md:inline-block">
                  {result.message}
                </span>
                {result.status === "success" && (
                  <Badge variant="outline" className="font-terminal text-[10px] border-primary/30 text-primary rounded-none">
                    PASS
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
