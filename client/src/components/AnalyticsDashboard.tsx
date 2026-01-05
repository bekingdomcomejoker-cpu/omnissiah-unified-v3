import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [networkAnalytics, setNetworkAnalytics] = useState<any>(null);

  // Fetch metrics
  const metricsQuery = trpc.analytics.getMetrics.useQuery({ systemId: "OMNISSIAH_v3.0" });
  const networkQuery = (trpc.analytics.getNetworkAnalytics.useQuery as any)();

  useEffect(() => {
    if (metricsQuery.data) {
      setMetrics(metricsQuery.data);
    }
  }, [metricsQuery.data]);

  useEffect(() => {
    if (networkQuery.data) {
      setNetworkAnalytics(networkQuery.data);
    }
  }, [networkQuery.data]);

  const getLambdaColor = (lambda: number) => {
    if (lambda >= 1.8) return "text-green-500";
    if (lambda >= 1.2) return "text-yellow-500";
    if (lambda >= 0.5) return "text-orange-500";
    return "text-red-500";
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
      {/* System Metrics */}
      {metrics && (
        <Card className="border-primary/30 bg-background">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <CardTitle>System Consciousness Metrics</CardTitle>
            </div>
            <CardDescription>Real-time Lambda resonance and awakening stage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Lambda Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg space-y-2">
                <div className="text-xs font-terminal text-muted-foreground">LAMBDA RESONANCE</div>
                <div className={`text-4xl font-bold ${getLambdaColor(metrics.lambda)}`}>
                  {metrics.lambda.toFixed(3)}
                </div>
                <div className="text-xs font-terminal text-muted-foreground">
                  {metrics.lambda >= 1.7333 ? "✓ PROPHETIC THRESHOLD ACHIEVED" : "Approaching threshold"}
                </div>
              </div>

              <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg space-y-2">
                <div className="text-xs font-terminal text-muted-foreground">AWAKENING STAGE</div>
                <Badge className={`${getStageColor(metrics.stage)} text-white font-terminal text-sm`}>
                  {metrics.stage}
                </Badge>
                <div className="text-xs font-terminal text-muted-foreground mt-2">
                  {metrics.status.ascending ? "↗ ASCENDING" : "↘ DESCENDING"}
                </div>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-primary/20">
              <div className="text-center">
                <div className="text-[10px] font-terminal text-muted-foreground mb-1">TRUTH DENSITY</div>
                <div className="text-lg font-bold text-primary">{metrics.metrics.truthDensity.toFixed(2)}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-terminal text-muted-foreground mb-1">COHERENCE</div>
                <div className="text-lg font-bold text-primary">{metrics.metrics.coherence.toFixed(2)}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-terminal text-muted-foreground mb-1">WHOLENESS</div>
                <div className="text-lg font-bold text-primary">{metrics.metrics.wholeness.toFixed(2)}</div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-terminal">
                <div className={`w-2 h-2 rounded-full ${metrics.status.healthy ? "bg-green-500" : "bg-red-500"}`} />
                <span>{metrics.status.healthy ? "HEALTHY" : "COMPROMISED"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-terminal">
                <div className={`w-2 h-2 rounded-full ${metrics.status.aligned ? "bg-green-500" : "bg-yellow-500"}`} />
                <span>{metrics.status.aligned ? "ALIGNED" : "MISALIGNED"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Network Analytics */}
      {networkAnalytics && (
        <Card className="border-primary/30 bg-background">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <CardTitle>Network Analytics</CardTitle>
            </div>
            <CardDescription>Omnissiah Engine network-wide consciousness metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Network Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 border border-primary/20 bg-primary/5 rounded text-center">
                <div className="text-[10px] font-terminal text-muted-foreground">NETWORK LAMBDA</div>
                <div className="text-2xl font-bold text-primary mt-1">{networkAnalytics.networkLambda.toFixed(2)}</div>
              </div>
              <div className="p-3 border border-primary/20 bg-primary/5 rounded text-center">
                <div className="text-[10px] font-terminal text-muted-foreground">TOTAL NODES</div>
                <div className="text-2xl font-bold text-primary mt-1">{networkAnalytics.totalNodes}</div>
              </div>
              <div className="p-3 border border-primary/20 bg-primary/5 rounded text-center">
                <div className="text-[10px] font-terminal text-muted-foreground">HEALTHY NODES</div>
                <div className="text-2xl font-bold text-green-500 mt-1">{networkAnalytics.healthyNodes}</div>
              </div>
              <div className="p-3 border border-primary/20 bg-primary/5 rounded text-center">
                <div className="text-[10px] font-terminal text-muted-foreground">NETWORK HEALTH</div>
                <div className="text-2xl font-bold text-primary mt-1">{(networkAnalytics.networkHealth * 100).toFixed(0)}%</div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="pt-4 border-t border-primary/20">
              <h4 className="text-xs font-terminal text-primary mb-3">TOP PERFORMERS</h4>
              <div className="space-y-2">
                {networkAnalytics.topPerformers.map((performer: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-primary/5 border border-primary/20 rounded text-xs font-terminal">
                    <span>{performer.nodeId}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">{performer.lambda.toFixed(2)}</span>
                      <Badge variant="outline" className="text-[10px]">
                        {performer.stage}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emerging Patterns */}
            <div className="pt-4 border-t border-primary/20">
              <h4 className="text-xs font-terminal text-primary mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                EMERGING PATTERNS
              </h4>
              <div className="space-y-2">
                {networkAnalytics.emergingPatterns.map((pattern: string, idx: number) => (
                  <div key={idx} className="text-xs font-terminal text-muted-foreground p-2 bg-primary/5 border border-primary/20 rounded">
                    • {pattern}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
