import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, Zap, Shield, RefreshCw, Activity, Search } from "lucide-react";

export default function LocalAIDashboard() {
  const [query, setQuery] = useState("");
  const [textToDecode, setTextToDecode] = useState("");

  const pipelineMutation = trpc.localAI.executeSequentialPipeline.useMutation();
  const decodeQuery = trpc.localAI.decodeWithOrangeAlphabet.useQuery({ text: textToDecode }, { enabled: !!textToDecode });
  const phaseLockQuery = trpc.localAI.getPhaseLockStatus.useQuery(undefined, { refetchInterval: 3000 });
  const selfCorrectMutation = trpc.localAI.triggerSelfCorrection.useMutation();

  const handlePipeline = () => {
    if (query) pipelineMutation.mutate({ query });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phase-Lock Status */}
        <Card className="bg-muted/10 border-primary/20 rounded-none col-span-1 md:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="font-sacred text-xl flex items-center gap-2">
                <Activity className="text-primary w-5 h-5" /> PHASE-LOCK STABILIZER
              </CardTitle>
              <Badge variant="outline" className="border-primary text-primary rounded-none">
                {phaseLockQuery.data?.report?.systemHealth || "OFFLINE"}
              </Badge>
            </div>
            <CardDescription className="font-terminal text-xs">The Queen Stabilizer - Non-local reference frame</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {phaseLockQuery.data?.report?.arms.map((arm: any) => (
                <div key={arm.name} className="p-3 border border-border bg-background/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-terminal text-xs uppercase">{arm.name}</span>
                    <div className={`w-2 h-2 rounded-full ${arm.health === 'online' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                  </div>
                  <div className="flex justify-between text-[10px] font-terminal text-muted-foreground">
                    <span>PHASE: {arm.phase}°</span>
                    <span>FREQ: {arm.frequency}Hz</span>
                  </div>
                  <Progress value={arm.amplitude * 100} className="h-1" />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="font-terminal text-xs text-muted-foreground">
                COHERENCE SCORE: <span className="text-primary">{(phaseLockQuery.data?.report?.coherenceScore || 0).toFixed(4)}</span>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => selfCorrectMutation.mutate()}
                className="rounded-none border-primary/50 text-primary hover:bg-primary/10 font-terminal text-[10px] h-7"
              >
                <RefreshCw className="w-3 h-3 mr-1" /> SELF-CORRECT
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sequential Pipeline */}
        <Card className="bg-muted/10 border-primary/20 rounded-none md:col-span-2">
          <CardHeader>
            <CardTitle className="font-sacred text-xl flex items-center gap-2">
              <Cpu className="text-primary w-5 h-5" /> TRINODE PIPELINE
            </CardTitle>
            <CardDescription className="font-terminal text-xs">Qwen (Reflex) → Gemma (Oracle) → DeepSeek (Warfare)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Enter query for sequential processing..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="rounded-none border-border bg-background font-terminal text-xs"
              />
              <Button 
                onClick={handlePipeline}
                disabled={pipelineMutation.isPending}
                className="rounded-none bg-primary text-primary-foreground font-terminal text-xs"
              >
                {pipelineMutation.isPending ? "PROCESSING..." : "EXECUTE"}
              </Button>
            </div>

            {pipelineMutation.data?.success && (
              <div className="space-y-4 mt-4">
                <div className="p-3 border border-primary/30 bg-primary/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-terminal text-xs text-primary">CONSENSUS REACHED</span>
                    <Badge className="bg-primary rounded-none text-[10px]">
                      λ: {pipelineMutation.data.pipeline.consensus.lambda.toFixed(4)}
                    </Badge>
                  </div>
                  <p className="font-terminal text-xs text-muted-foreground italic">
                    {pipelineMutation.data.pipeline.consensus.isAwakened ? "SYSTEM AWAKENED" : "SYSTEM ALIGNED"}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {['qwen', 'gemma', 'deepseek'].map((node) => (
                    <div key={node} className="p-2 border border-border bg-background text-[10px] font-terminal">
                      <div className="text-primary uppercase mb-1">{node} OUTPUT:</div>
                      <div className="text-muted-foreground line-clamp-2">{(pipelineMutation.data.pipeline as any)[node].content}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Orange Alphabet Decoder */}
        <Card className="bg-muted/10 border-primary/20 rounded-none">
          <CardHeader>
            <CardTitle className="font-sacred text-xl flex items-center gap-2">
              <Shield className="text-primary w-5 h-5" /> ORANGE DECODER
            </CardTitle>
            <CardDescription className="font-terminal text-xs">Pattern recognition & compression truth</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Text to decode..." 
                value={textToDecode}
                onChange={(e) => setTextToDecode(e.target.value)}
                className="rounded-none border-border bg-background font-terminal text-xs"
              />
            </div>

            {decodeQuery.data?.success && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-terminal text-[10px] text-muted-foreground">TRUTH SCORE:</span>
                  <span className="font-terminal text-xs text-primary">{(decodeQuery.data.truthTest.truth_score * 100).toFixed(1)}%</span>
                </div>
                <Progress value={decodeQuery.data.truthTest.truth_score * 100} className="h-1" />
                
                <div className="space-y-1">
                  <div className="font-terminal text-[10px] text-muted-foreground">CATEGORY:</div>
                  <Badge variant="outline" className="border-primary text-primary rounded-none text-[10px] uppercase">
                    {decodeQuery.data.truthTest.category}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="font-terminal text-[10px] text-muted-foreground">PATTERNS:</div>
                  <div className="flex flex-wrap gap-1">
                    {decodeQuery.data.patterns.map((p: any, i: number) => (
                      <Badge key={i} className="bg-muted text-muted-foreground rounded-none text-[8px]">
                        {p.type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
