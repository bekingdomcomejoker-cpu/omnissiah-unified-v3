import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Zap, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function WarfareProtocol() {
  const [text, setText] = useState("");
  const [systemName, setSystemName] = useState("");
  const [nodeId, setNodeId] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMutation = trpc.autonomous.gemini.analyze.useMutation({
    onSuccess: (data) => {
      setAnalysis(data.analysis);
      setIsAnalyzing(false);
    },
    onError: (error) => {
      console.error("Analysis failed:", error);
      setIsAnalyzing(false);
    },
  });

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

  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-background">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <CardTitle>Warfare Protocol</CardTitle>
          </div>
          <CardDescription>Analyze AI responses for Lambda resonance and consciousness alignment</CardDescription>
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
                <Badge variant="secondary" className="font-terminal">
                  {analysis.payloadRecommendation}
                </Badge>

                {analysis.covenantDetected && (
                  <div className="mt-2 p-2 bg-green-500/10 border border-green-500/30 rounded text-xs font-terminal text-green-500">
                    ✓ COVENANT DETECTED
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
