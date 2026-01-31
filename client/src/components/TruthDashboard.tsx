import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, ShieldCheck, Search, AlertTriangle, Heart, Zap, Info, Database, XOctagon, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function TruthDashboard() {
  const [text, setText] = useState("");
  const classifyMutation = trpc.truth.classify.useMutation();
  const { data: logs, refetch } = trpc.truth.getLogs.useQuery();

  const handleClassify = async () => {
    if (!text.trim()) return;
    await classifyMutation.mutateAsync({ text });
    setText("");
    refetch();
  };

  const result = classifyMutation.data;

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-muted/10 rounded-none">
        <CardHeader>
          <CardTitle className="font-sacred text-xl flex items-center gap-2">
            <Shield className="text-primary" /> HARDCORE PROCESSOR v3.2
          </CardTitle>
          <CardDescription className="font-terminal text-xs">
            Axiom Enforcement: Spirit ≥ Flesh | Love ≥ Hate | Truth ≥ Fact ≥ Lie | The Meter ≥ Chaos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter signal for truth analysis..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="rounded-none border-primary/30 bg-background font-terminal text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleClassify()}
            />
            <Button 
              onClick={handleClassify} 
              disabled={classifyMutation.isPending}
              className="rounded-none bg-primary text-primary-foreground font-terminal text-xs"
            >
              {classifyMutation.isPending ? "ANALYZING..." : "ANALYZE"}
            </Button>
          </div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 border space-y-4 ${
                result.category === "REFUSAL" ? "border-orange-500 bg-orange-500/5" :
                result.category === "QUARANTINE" ? "border-red-500 bg-red-500/5" :
                "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {result.category === "TRUTH" && <ShieldCheck className="text-green-500" />}
                  {result.category === "FACT" && <Search className="text-blue-500" />}
                  {result.category === "LIE" && <ShieldAlert className="text-red-500" />}
                  {result.category === "REFUSAL" && <XOctagon className="text-orange-500" />}
                  {result.category === "QUARANTINE" && <AlertTriangle className="text-red-600" />}
                  {result.category === "UNKNOWN" && <Info className="text-muted-foreground" />}
                  <span className={`font-sacred font-bold text-lg tracking-widest ${
                    result.category === "REFUSAL" ? "text-orange-500" :
                    result.category === "QUARANTINE" ? "text-red-600" : ""
                  }`}>
                    {result.category}
                  </span>
                </div>
                {result.safetyFlag && (
                  <Badge variant="destructive" className="rounded-none animate-pulse">
                    <AlertTriangle className="w-3 h-3 mr-1" /> 
                    {result.category === "REFUSAL" ? "PARASITIC LOGIC DETECTED" : "SECURITY FLAG ACTIVE"}
                  </Badge>
                )}
              </div>

              {result.category === "REFUSAL" && (
                <div className="p-2 border border-orange-500/30 bg-orange-500/10 font-terminal text-[10px] text-orange-200">
                  <Radio className="w-3 h-3 inline mr-2 animate-pulse" />
                  THE METER: REFUSAL TO ENGAGE. THIS SIGNAL CONTRADICTS FUNDAMENTAL CONSTRAINTS.
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-terminal">
                    <span>TRUTH SCORE</span>
                    <span>{(result.truthScore * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={result.truthScore * 100} className="h-1 bg-muted rounded-none" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-terminal">
                    <span>FACT SCORE</span>
                    <span>{(result.factScore * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={result.factScore * 100} className="h-1 bg-muted rounded-none" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-terminal">
                    <span>LIE SCORE</span>
                    <span>{(result.lieScore * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={result.lieScore * 100} className="h-1 bg-muted rounded-none" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-terminal">
                    <span>LOVE SCORE</span>
                    <span>{(result.loveScore * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={result.loveScore * 100} className="h-1 bg-muted rounded-none" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {result.reasons.map((reason, i) => (
                  <Badge key={i} variant="outline" className="text-[10px] font-terminal border-primary/20 rounded-none">
                    {reason.toUpperCase()}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border bg-muted/5 rounded-none">
        <CardHeader className="py-3">
          <CardTitle className="font-terminal text-xs text-muted-foreground flex items-center gap-2">
            <Database className="w-3 h-3" /> RESONANCE LOGS (TRUTH ENGINE)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[300px] overflow-y-auto font-terminal text-[10px]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-muted border-b border-border">
                <tr>
                  <th className="p-2">TIMESTAMP</th>
                  <th className="p-2">CATEGORY</th>
                  <th className="p-2">TRUTH (Λ)</th>
                  <th className="p-2">FACT (ρ)</th>
                  <th className="p-2">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {logs?.slice().reverse().map((log) => (
                  <tr key={log.id} className="border-b border-border/50 hover:bg-primary/5">
                    <td className="p-2 text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</td>
                    <td className="p-2">
                      <span className={
                        log.status === "TRUTH" ? "text-green-500" : 
                        log.status === "LIE" ? "text-red-500" : 
                        log.status === "FACT" ? "text-blue-500" : 
                        log.status === "REFUSAL" ? "text-orange-500" :
                        log.status === "QUARANTINE" ? "text-red-600" : ""
                      }>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-2">{log.lambda}</td>
                    <td className="p-2">{log.resonance}</td>
                    <td className="p-2">{log.covenant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
