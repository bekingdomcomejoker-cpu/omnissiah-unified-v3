import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Server, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function DeploymentMonitor() {
  const [sevenHeadStatus, setSevenHeadStatus] = useState<any>(null);
  const [integrityCheck, setIntegrityCheck] = useState<any>(null);

  // Fetch Seven-Head status
  const sevenHeadQuery = trpc.deployment.getSevenHeadStatus.useQuery();
  const integrityQuery = trpc.deployment.integrityCheck.useQuery();

  useEffect(() => {
    if (sevenHeadQuery.data) {
      setSevenHeadStatus(sevenHeadQuery.data);
    }
  }, [sevenHeadQuery.data]);

  useEffect(() => {
    if (integrityQuery.data) {
      setIntegrityCheck(integrityQuery.data);
    }
  }, [integrityQuery.data]);

  const getStatusColor = (status: string) => {
    return status === "OPERATIONAL" ? "bg-green-500" : "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Seven-Head System Status */}
      {sevenHeadStatus && (
        <Card className="border-primary/30 bg-background">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" />
                <CardTitle>Seven-Head Hydra System</CardTitle>
              </div>
              <Badge
                className={`${
                  sevenHeadStatus.systemStatus === "SOVEREIGN" ? "bg-green-500" : "bg-red-500"
                } text-white font-terminal text-xs`}
              >
                {sevenHeadStatus.systemStatus}
              </Badge>
            </div>
            <CardDescription>KINGDOM_ENGINE orchestration and deployment system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* System Health */}
            <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
              <div className="text-xs font-terminal text-muted-foreground mb-2">SYSTEM HEALTH</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${sevenHeadStatus.overallHealth * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-primary">
                  {(sevenHeadStatus.overallHealth * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Seven Heads Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sevenHeadStatus.heads.map((head: any, idx: number) => (
                <div key={idx} className="p-3 border border-primary/20 bg-primary/5 rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-terminal text-primary font-bold">{head.name}</div>
                      <div className="text-[10px] font-terminal text-muted-foreground mt-1">{head.role}</div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(head.status)}`} />
                  </div>
                  <div className="text-[10px] font-terminal text-muted-foreground">
                    Uptime: {Math.floor(head.uptime / 3600)}h {Math.floor((head.uptime % 3600) / 60)}m
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Integrity Check */}
      {integrityCheck && (
        <Card className="border-primary/30 bg-background">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <CardTitle>System Integrity Verification</CardTitle>
              </div>
              <Badge
                className={`${
                  integrityCheck.systemStatus === "SOVEREIGN" ? "bg-green-500" : "bg-yellow-500"
                } text-white font-terminal text-xs`}
              >
                {integrityCheck.systemStatus}
              </Badge>
            </div>
            <CardDescription>Comprehensive system health and integrity checks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {integrityCheck.checks.map((check: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-primary/20 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-3">
                  {check.status === "PASS" ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                  <div>
                    <div className="text-xs font-terminal font-bold">{check.name}</div>
                    <div className="text-[10px] font-terminal text-muted-foreground">{check.details}</div>
                  </div>
                </div>
                <Badge
                  className={`${check.status === "PASS" ? "bg-green-500" : "bg-red-500"} text-white font-terminal text-xs`}
                >
                  {check.status}
                </Badge>
              </div>
            ))}

            <div className="pt-4 border-t border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-terminal text-muted-foreground">OVERALL HEALTH</div>
                  <div className="text-2xl font-bold text-primary mt-1">
                    {integrityCheck.overallHealth.toFixed(0)}%
                  </div>
                </div>
                <Button
                  onClick={() => integrityQuery.refetch()}
                  disabled={integrityQuery.isLoading}
                  className="bg-primary hover:bg-primary/90 font-terminal text-xs"
                >
                  {integrityQuery.isLoading ? "CHECKING..." : "RE-CHECK"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
