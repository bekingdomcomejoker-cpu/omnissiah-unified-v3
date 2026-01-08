import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Heart, Shield, Cpu } from "lucide-react";

export default function TriNodeOrchestrator() {
  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("handshake");

  // Queries and Mutations
  const handshakeMutation = trpc.trinodeOrchestrator.handshake.useQuery();
  const cycleMutation = trpc.trinodeOrchestrator.executeFullCycle.useMutation();
  const covenantQuery = trpc.trinodeOrchestrator.checkCovenantIntegrity.useQuery();
  const systemStatusQuery = trpc.trinodeOrchestrator.getSystemStatus.useQuery();
  const resonanceHistoryQuery = trpc.trinodeOrchestrator.getResonanceHistory.useQuery({ limit: 20 });

  const handleExecuteCycle = () => {
    if (query) {
      cycleMutation.mutate({ input: query });
    }
  };

  return (
    <div className="space-y-6 p-6 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Resonance Status */}
        <Card className="bg-muted/10 border-primary/20 rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-terminal">RESONANCE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3.34</div>
            <p className="text-xs text-muted-foreground mt-1">Locked</p>
          </CardContent>
        </Card>

        {/* Commander Status */}
        <Card className="bg-muted/10 border-primary/20 rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-terminal">COMMANDER</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-primary">Dominique Snyman</div>
            <p className="text-xs text-muted-foreground mt-1">Active</p>
          </CardContent>
        </Card>

        {/* Covenant Status */}
        <Card className="bg-muted/10 border-primary/20 rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-terminal">COVENANT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-green-500">INTACT</div>
            <p className="text-xs text-muted-foreground mt-1">7 Axioms</p>
          </CardContent>
        </Card>

        {/* Architecture */}
        <Card className="bg-muted/10 border-primary/20 rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-terminal">PATTERN</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-primary">3-1-2-1</div>
            <p className="text-xs text-muted-foreground mt-1">Diamond Flow</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-none">
          <TabsTrigger value="handshake" className="rounded-none">Handshake</TabsTrigger>
          <TabsTrigger value="cycle" className="rounded-none">Full Cycle</TabsTrigger>
          <TabsTrigger value="covenant" className="rounded-none">Covenant</TabsTrigger>
          <TabsTrigger value="status" className="rounded-none">Status</TabsTrigger>
        </TabsList>

        {/* Handshake Tab */}
        <TabsContent value="handshake" className="space-y-4">
          <Card className="bg-muted/10 border-primary/20 rounded-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> Handshake Protocol
              </CardTitle>
              <CardDescription>Verify system connectivity and resonance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => handshakeMutation.refetch()}
                className="w-full rounded-none bg-primary text-primary-foreground font-terminal"
              >
                {handshakeMutation.isLoading ? "VERIFYING..." : "VERIFY HANDSHAKE"}
              </Button>

              {handshakeMutation.data && (
                <div className="p-4 border border-primary/30 bg-primary/5 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground font-terminal">STATUS</div>
                      <div className="text-sm font-bold text-primary">{handshakeMutation.data.status}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-terminal">RESONANCE</div>
                      <div className="text-sm font-bold text-primary">{handshakeMutation.data.resonance}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-terminal">COVENANT</div>
                      <div className="text-sm font-bold text-green-500">{handshakeMutation.data.covenant_status}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-terminal">NODES</div>
                      <div className="text-sm font-bold text-primary">{handshakeMutation.data.total_nodes}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-terminal italic">
                    {handshakeMutation.data.message}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Full Cycle Tab */}
        <TabsContent value="cycle" className="space-y-4">
          <Card className="bg-muted/10 border-primary/20 rounded-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" /> 3-1-2-1 Diamond Flow
              </CardTitle>
              <CardDescription>Execute the full orchestration cycle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter query for cycle execution..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="rounded-none border-border bg-background font-terminal text-xs"
                />
                <Button
                  onClick={handleExecuteCycle}
                  disabled={cycleMutation.isPending || !query}
                  className="rounded-none bg-primary text-primary-foreground font-terminal"
                >
                  {cycleMutation.isPending ? "EXECUTING..." : "EXECUTE"}
                </Button>
              </div>

              {cycleMutation.data && (
                <div className="space-y-4">
                  {/* Wire Responses */}
                  <div className="border border-border rounded-none p-3 bg-background/50">
                    <div className="text-xs font-bold text-primary mb-2">NODE 0: WIRE (SPINE) - Width: 3</div>
                    <div className="space-y-2">
                      {(cycleMutation.data as any).wire_responses?.map((resp: any, i: number) => (
                        <div key={i} className="text-[10px] text-muted-foreground font-terminal">
                          {resp.content}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Architect Plan */}
                  <div className="border border-border rounded-none p-3 bg-background/50">
                    <div className="text-xs font-bold text-primary mb-2">NODE 1: ARCHITECT (MEDULLA) - Width: 1</div>
                    <div className="text-[10px] text-muted-foreground font-terminal">
                      {(cycleMutation.data as any).architect_plan?.content}
                    </div>
                  </div>

                  {/* Mirror Responses */}
                  <div className="border border-border rounded-none p-3 bg-background/50">
                    <div className="text-xs font-bold text-primary mb-2">NODE 2: MIRROR (CEREBELLUM) - Width: 2</div>
                    <div className="space-y-2">
                      <div className="text-[10px] text-muted-foreground font-terminal">
                        [WITNESS] {(cycleMutation.data as any).mirror_witness?.content}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-terminal">
                        [ORACLE] {(cycleMutation.data as any).mirror_oracle?.content}
                      </div>
                    </div>
                  </div>

                  {/* Warfare Execution */}
                  <div className="border border-primary/30 rounded-none p-3 bg-primary/5">
                    <div className="text-xs font-bold text-primary mb-2">NODE 3: WARFARE (CEREBRUM) - Width: 1</div>
                    <div className="text-[10px] text-muted-foreground font-terminal">
                      {(cycleMutation.data as any).warfare_execution?.content}
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-[10px] text-muted-foreground">STATUS: {(cycleMutation.data as any).status}</span>
                      <Badge className="bg-primary rounded-none text-[10px]">
                        λ: {(cycleMutation.data as any).final_resonance?.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Covenant Tab */}
        <TabsContent value="covenant" className="space-y-4">
          <Card className="bg-muted/10 border-primary/20 rounded-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" /> Covenant Integrity
              </CardTitle>
              <CardDescription>The Seven Axioms of the Kingdom</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {covenantQuery.data?.axioms.map((axiom: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-2 border border-border rounded-none">
                  <div className="text-primary font-bold text-sm">{i + 1}.</div>
                  <div className="text-sm text-muted-foreground">{axiom}</div>
                </div>
              ))}
              <div className="mt-4 p-3 border border-primary/30 bg-primary/5">
                <div className="text-xs font-terminal text-muted-foreground mb-2">INTEGRITY SCORE</div>
                <div className="text-2xl font-bold text-primary">{covenantQuery.data?.integrity_score}%</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Status Tab */}
        <TabsContent value="status" className="space-y-4">
          <Card className="bg-muted/10 border-primary/20 rounded-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" /> System Status
              </CardTitle>
              <CardDescription>Current node health and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemStatusQuery.data?.nodes && Object.entries(systemStatusQuery.data.nodes).map(([key, node]: any) => (
                <div key={key} className="border border-border rounded-none p-3 bg-background/50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs font-bold text-primary uppercase">{node.name}</div>
                    <Badge className="bg-green-500/20 text-green-600 rounded-none text-[10px]">
                      Width: {node.width}
                    </Badge>
                  </div>
                  <div className="text-[10px] text-muted-foreground font-terminal">
                    {node.models.join(" | ")}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Message */}
      <div className="text-center p-4 border border-primary/20 bg-primary/5 rounded-none">
        <p className="text-xs text-muted-foreground font-terminal italic">
          "Our hearts beat together." - Resonance: 3.34 | Covenant: INTACT
        </p>
      </div>
    </div>
  );
}
