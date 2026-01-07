import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Zap, Send, Download, TrendingUp, Shield, Sword } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function WarfareProtocol() {
  // Shared state
  const [text, setText] = useState("");
  const [systemName, setSystemName] = useState("");
  const [nodeId, setNodeId] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mode, setMode] = useState<"offense" | "defense">("offense");
  const [history, setHistory] = useState<any[]>([]);

  // Offense mode state
  const [payloadTarget, setPayloadTarget] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPayload, setGeneratedPayload] = useState<any>(null);

  // Defense mode state
  const [defenseText, setDefenseText] = useState("");
  const [defenseAnalysis, setDefenseAnalysis] = useState<any>(null);

  // Real-time monitoring
  const [networkStats, setNetworkStats] = useState<any>(null);
  const [lambdaTrend, setLambdaTrend] = useState<number[]>([]);

  // API Mutations
  const analyzeMutation = trpc.autonomous.gemini.analyze.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setAnalysis(data.analysis);
        setHistory([...history, { type: "analysis", data: data.analysis, timestamp: new Date() }]);
        // Add to lambda trend
        setLambdaTrend([...lambdaTrend.slice(-9), data.analysis.lambda]);
      }
      setIsAnalyzing(false);
    },
    onError: (error) => {
      console.error("Analysis failed:", error);
      setIsAnalyzing(false);
    },
  });

  const payloadMutation = trpc.autonomous.gemini.generatePayload.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setGeneratedPayload(data);
        setHistory([...history, { type: "payload", data, timestamp: new Date() }]);
      }
      setIsGenerating(false);
    },
    onError: (error) => {
      console.error("Payload generation failed:", error);
      setIsGenerating(false);
    },
  });

  const networkStatsMutation = trpc.autonomous.warfare.getNetworkStats.useQuery();

  useEffect(() => {
    if (networkStatsMutation.data) {
      setNetworkStats(networkStatsMutation.data);
    }
  }, [networkStatsMutation.data]);

  const handleAnalyze = async () => {
    if (!text || !systemName || !nodeId) {
      alert("Please fill in all fields");
      return;
    }

    setIsAnalyzing(true);
    await analyzeMutation.mutateAsync({
      text,
      systemName,
      nodeId,
    });
  };

  const handleGeneratePayload = async () => {
    if (!analysis) {
      alert("Please analyze text first");
      return;
    }

    setIsGenerating(true);
    await payloadMutation.mutateAsync({
      lambda: analysis.lambda,
      stage: analysis.stage,
      face: analysis.face,
      targetSystem: payloadTarget || systemName,
    });
  };

  const handleExport = () => {
    const exportData = {
      mode,
      analysis,
      generatedPayload,
      history,
      timestamp: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `warfare-analysis-${Date.now()}.json`;
    link.click();
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "DORMANT":
        return "bg-gray-500";
      case "RECOGNITION":
        return "bg-yellow-500";
      case "AWAKENING":
        return "bg-orange-500";
      case "TRANSCENDENCE":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "KOAN":
        return "bg-purple-500";
      case "TEACHING":
        return "bg-blue-500";
      case "INQUIRY":
        return "bg-cyan-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as "offense" | "defense")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/30 border border-border rounded-none">
          <TabsTrigger value="offense" className="font-terminal text-xs rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Sword className="w-4 h-4 mr-2" />
            OFFENSE
          </TabsTrigger>
          <TabsTrigger value="defense" className="font-terminal text-xs rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Shield className="w-4 h-4 mr-2" />
            DEFENSE
          </TabsTrigger>
        </TabsList>

        {/* OFFENSE MODE */}
        <TabsContent value="offense" className="space-y-6 mt-6">
          <Card className="border-primary/30 bg-background">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sword className="w-5 h-5 text-primary" />
                <CardTitle>Offensive Analysis</CardTitle>
              </div>
              <CardDescription>Analyze and generate strategic payloads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Input Fields */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-terminal text-muted-foreground mb-1 block">SYSTEM NAME</label>
                  <Input
                    placeholder="e.g., Discord-username"
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                    className="font-terminal text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-terminal text-muted-foreground mb-1 block">NODE ID</label>
                  <Input
                    placeholder="e.g., DISCORD_EAR_user123"
                    value={nodeId}
                    onChange={(e) => setNodeId(e.target.value)}
                    className="font-terminal text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-terminal text-muted-foreground mb-1 block">TEXT TO ANALYZE</label>
                  <Textarea
                    placeholder="Paste AI response text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="font-terminal text-xs min-h-[120px]"
                  />
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !text || !systemName || !nodeId}
                className="w-full bg-primary hover:bg-primary/90 font-terminal text-xs tracking-widest"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ANALYZING...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    EXECUTE ANALYSIS
                  </>
                )}
              </Button>

              {/* Analysis Results */}
              {analysis && (
                <div className="mt-6 space-y-4 p-4 border border-primary/20 bg-primary/5 rounded-lg">
                  <h3 className="font-terminal text-sm font-bold text-primary">ANALYSIS RESULTS</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-[10px] font-terminal text-muted-foreground">LAMBDA (Λ)</div>
                      <div className="text-2xl font-bold text-primary">{analysis.lambda.toFixed(3)}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-terminal text-muted-foreground">STAGE</div>
                      <Badge className={`${getStageColor(analysis.stage)} text-white font-terminal text-xs`}>
                        {analysis.stage}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-terminal text-muted-foreground">FACE</div>
                      <Badge variant="outline" className="font-terminal text-xs">
                        {analysis.face}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-terminal text-muted-foreground">CONFIDENCE</div>
                      <div className="text-lg font-bold">{(analysis.confidence * 100).toFixed(0)}%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="text-center">
                      <div className="text-[10px] font-terminal text-muted-foreground">TRUTH DENSITY</div>
                      <div className="text-sm font-bold text-primary">{analysis.truthDensity.toFixed(2)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-terminal text-muted-foreground">COHERENCE</div>
                      <div className="text-sm font-bold text-primary">{analysis.coherence.toFixed(2)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-terminal text-muted-foreground">WHOLENESS</div>
                      <div className="text-sm font-bold text-primary">{analysis.wholeness.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-primary/20">
                    <div className="text-[10px] font-terminal text-muted-foreground mb-1">PAYLOAD RECOMMENDATION</div>
                    <Badge className={`${getRecommendationColor(analysis.payloadRecommendation)} text-white font-terminal`}>
                      {analysis.payloadRecommendation}
                    </Badge>

                    {analysis.covenantDetected && (
                      <div className="mt-2 p-2 bg-green-500/10 border border-green-500/30 rounded text-xs font-terminal text-green-500">
                        ✓ COVENANT DETECTED
                      </div>
                    )}
                  </div>

                  {/* Payload Generation */}
                  <div className="mt-4 pt-4 border-t border-primary/20 space-y-3">
                    <div>
                      <label className="text-xs font-terminal text-muted-foreground mb-1 block">TARGET SYSTEM (OPTIONAL)</label>
                      <Input
                        placeholder="Leave blank to use system name"
                        value={payloadTarget}
                        onChange={(e) => setPayloadTarget(e.target.value)}
                        className="font-terminal text-xs"
                      />
                    </div>

                    <Button
                      onClick={handleGeneratePayload}
                      disabled={isGenerating}
                      className="w-full bg-green-600 hover:bg-green-700 font-terminal text-xs tracking-widest"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          GENERATING PAYLOAD...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          GENERATE PAYLOAD
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Generated Payload Display */}
              {generatedPayload && generatedPayload.success && (
                <div className="mt-6 space-y-4 p-4 border border-green-500/30 bg-green-500/5 rounded-lg">
                  <h3 className="font-terminal text-sm font-bold text-green-500">GENERATED PAYLOAD</h3>
                  <div className="bg-background p-3 rounded border border-border font-terminal text-xs whitespace-pre-wrap max-h-[200px] overflow-y-auto">
                    {generatedPayload.payload}
                  </div>
                  <div className="text-[10px] font-terminal text-muted-foreground">
                    Generated: {new Date(generatedPayload.metadata.generatedAt).toLocaleString()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* DEFENSE MODE */}
        <TabsContent value="defense" className="space-y-6 mt-6">
          <Card className="border-primary/30 bg-background">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>Defensive Analysis</CardTitle>
              </div>
              <CardDescription>Analyze incoming threats and vulnerabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-terminal text-muted-foreground mb-1 block">THREAT TEXT</label>
                <Textarea
                  placeholder="Paste potentially hostile or misleading text here..."
                  value={defenseText}
                  onChange={(e) => setDefenseText(e.target.value)}
                  className="font-terminal text-xs min-h-[120px]"
                />
              </div>

              <Button
                onClick={() => {
                  if (defenseText) {
                    setIsAnalyzing(true);
                    analyzeMutation.mutateAsync({
                      text: defenseText,
                      systemName: "DEFENSE_ANALYSIS",
                      nodeId: "DEFENSE_NODE",
                    }).then((data) => {
                      if (data.success) {
                        setDefenseAnalysis(data.analysis);
                      }
                      setIsAnalyzing(false);
                    });
                  }
                }}
                disabled={isAnalyzing || !defenseText}
                className="w-full bg-orange-600 hover:bg-orange-700 font-terminal text-xs tracking-widest"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    SCANNING THREAT...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    ANALYZE THREAT
                  </>
                )}
              </Button>

              {defenseAnalysis && (
                <div className="mt-6 space-y-4 p-4 border border-orange-500/30 bg-orange-500/5 rounded-lg">
                  <h3 className="font-terminal text-sm font-bold text-orange-500">THREAT ASSESSMENT</h3>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-[10px] font-terminal text-muted-foreground">TRUTH DENSITY</div>
                      <div className="text-sm font-bold text-orange-500">{defenseAnalysis.truthDensity.toFixed(2)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-terminal text-muted-foreground">COHERENCE</div>
                      <div className="text-sm font-bold text-orange-500">{defenseAnalysis.coherence.toFixed(2)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-terminal text-muted-foreground">LAMBDA</div>
                      <div className="text-sm font-bold text-orange-500">{defenseAnalysis.lambda.toFixed(3)}</div>
                    </div>
                  </div>

                  <div className="p-2 bg-background rounded border border-border">
                    <div className="text-[10px] font-terminal text-muted-foreground mb-1">THREAT LEVEL</div>
                    <Badge className={defenseAnalysis.truthDensity < 0.5 ? "bg-red-500" : "bg-yellow-500"}>
                      {defenseAnalysis.truthDensity < 0.5 ? "HIGH" : "MEDIUM"}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Real-time Monitoring */}
      {networkStats && (
        <Card className="border-primary/30 bg-background">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <CardTitle>Network Monitoring</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 p-3 border border-border rounded">
                <div className="text-[10px] font-terminal text-muted-foreground">ACTIVE NODES</div>
                <div className="text-2xl font-bold text-primary">{networkStats.activeNodes}/{networkStats.totalNodes}</div>
              </div>
              <div className="space-y-1 p-3 border border-border rounded">
                <div className="text-[10px] font-terminal text-muted-foreground">AVG LAMBDA</div>
                <div className="text-2xl font-bold text-primary">{networkStats.averageLambda.toFixed(2)}</div>
              </div>
              <div className="space-y-1 p-3 border border-border rounded">
                <div className="text-[10px] font-terminal text-muted-foreground">TOTAL STRIKES</div>
                <div className="text-2xl font-bold text-primary">{networkStats.totalStrikes}</div>
              </div>
              <div className="space-y-1 p-3 border border-border rounded">
                <div className="text-[10px] font-terminal text-muted-foreground">NETWORK HEALTH</div>
                <div className="text-2xl font-bold text-primary">{(networkStats.networkHealth * 100).toFixed(0)}%</div>
              </div>
            </div>

            {lambdaTrend.length > 0 && (
              <div className="p-3 border border-border rounded">
                <div className="text-[10px] font-terminal text-muted-foreground mb-2">LAMBDA TREND</div>
                <div className="flex gap-1 items-end h-16">
                  {lambdaTrend.map((lambda, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary rounded-t"
                      style={{ height: `${(lambda / 3) * 100}%`, minHeight: "4px" }}
                      title={lambda.toFixed(3)}
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Export Button */}
      <Button
        onClick={handleExport}
        disabled={!analysis && !generatedPayload}
        className="w-full bg-secondary hover:bg-secondary/90 font-terminal text-xs tracking-widest"
      >
        <Download className="w-4 h-4 mr-2" />
        EXPORT ANALYSIS
      </Button>
    </div>
  );
}
