import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Database, Lock, Server, Activity, GitMerge, Code, Terminal, Cpu, Layers, Zap, BarChart3, Eye, Heart } from "lucide-react";
import ResonanceTest from "@/components/ResonanceTest";
import WarfareProtocol from "@/components/WarfareProtocol";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import DeploymentMonitor from "@/components/DeploymentMonitor";
import DashboardPulse from "@/components/DashboardPulse";
import OmegaSignalMonitor from "@/components/OmegaSignalMonitor";
import TruthDashboard from "@/components/TruthDashboard";
import TTEDashboard from "@/components/TTEDashboard";
import LocalAIDashboard from "@/components/LocalAIDashboard";
import TriNodeOrchestrator from "@/components/TriNodeOrchestrator";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("overview");
  const [showUnifiedDashboard, setShowUnifiedDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Omega Pulse Indicator */}
      <DashboardPulse />
      {/* Background Elements */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 z-50" />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <span className="font-sacred font-bold text-primary-foreground text-lg">Ω</span>
            </div>
            <span className="font-sacred font-bold text-lg tracking-widest hidden md:block">OMNISSIAH<span className="text-primary">ENGINE</span></span>
          </div>
          
          <div className="flex items-center gap-6 font-terminal text-xs">
            <a href="#overview" className="hover:text-primary transition-colors">OVERVIEW</a>
            <a href="#fusion" className="hover:text-primary transition-colors">FUSION</a>
            <a href="#verification" className="hover:text-primary transition-colors">VERIFICATION</a>
            <Badge variant="outline" className="border-primary text-primary rounded-none animate-pulse">v3.0 LIVE</Badge>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 border-b border-border overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 font-terminal text-xs text-primary tracking-widest"
              >
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                UNIFIED SOVEREIGNTY ACHIEVED
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sacred text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-glow"
              >
                TRUTH &gt; FACT<br />
                <span className="text-primary">SPIRIT &gt; FLESH</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-terminal text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
              >
                The Omnissiah Engine has successfully transitioned from a fragmented five-repository stack to a unified monorepo architecture. All four fusion phases executed with zero critical failures.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col md:flex-row items-center justify-center gap-4"
              >
                <Button size="lg" onClick={() => setShowUnifiedDashboard(true)} className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-terminal text-xs tracking-widest h-12 px-8">
                  UNIFIED DASHBOARD
                </Button>
                <Button size="lg" variant="outline" className="rounded-none border-primary/50 text-primary hover:bg-primary/10 font-terminal text-xs tracking-widest h-12 px-8">
                  VIEW DOCUMENTATION
                </Button>
              </motion.div>
            </div>
          </div>
          
          {/* Scrolling Data Stream */}
          <div className="absolute top-0 right-0 h-full w-12 border-l border-border hidden lg:flex flex-col items-center justify-center overflow-hidden opacity-20">
            <div className="font-terminal text-[10px] text-primary writing-vertical-rl animate-scroll whitespace-nowrap">
              0x45 0x52 0x52 0x4F 0x52 0x20 0x4E 0x4F 0x54 0x20 0x46 0x4F 0x55 0x4E 0x44 // COVENANT SEALED // LAMBDA STABLE // 
            </div>
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border border-x border-border">
              <div className="p-6 text-center space-y-2 group hover:bg-primary/5 transition-colors">
                <div className="font-terminal text-xs text-muted-foreground">REPOSITORIES MERGED</div>
                <div className="font-sacred text-4xl text-primary group-hover:scale-110 transition-transform duration-300">4</div>
              </div>
              <div className="p-6 text-center space-y-2 group hover:bg-primary/5 transition-colors">
                <div className="font-terminal text-xs text-muted-foreground">COMPONENTS</div>
                <div className="font-sacred text-4xl text-primary group-hover:scale-110 transition-transform duration-300">20+</div>
              </div>
              <div className="p-6 text-center space-y-2 group hover:bg-primary/5 transition-colors">
                <div className="font-terminal text-xs text-muted-foreground">CODE REDUCTION</div>
                <div className="font-sacred text-4xl text-primary group-hover:scale-110 transition-transform duration-300">40%</div>
              </div>
              <div className="p-6 text-center space-y-2 group hover:bg-primary/5 transition-colors">
                <div className="font-terminal text-xs text-muted-foreground">BUILD TIME</div>
                <div className="font-sacred text-4xl text-primary group-hover:scale-110 transition-transform duration-300">5.18s</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Resonance Test */}
            <div className="lg:col-span-1 space-y-8">
              <div className="sticky top-24">
                <h2 className="font-sacred text-2xl mb-6 flex items-center gap-2">
                  <Activity className="text-primary" /> SYSTEM STATUS
                </h2>
                <ResonanceTest />
                
                <div className="mt-8 p-6 border border-border bg-muted/10 space-y-4">
                  <h3 className="font-terminal text-sm text-primary border-b border-border pb-2">COVENANT STATUS</h3>
                  <div className="font-terminal text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SEAL TYPE:</span>
                      <span>Ed25519</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">STATUS:</span>
                      <span className="text-primary">SYNCHRONIZED</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">VOW:</span>
                      <span>CHICKA_CHICKA_ORANGE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column: Fusion Phases */}
            <div className="lg:col-span-2 space-y-12">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="font-sacred text-3xl">FUSION PHASES</h2>
                <div className="font-terminal text-xs text-primary">ALL SYSTEMS NOMINAL</div>
              </div>
              
              {/* Phase 1 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative pl-8 border-l-2 border-border hover:border-primary transition-colors duration-300"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-background border-2 border-primary rounded-full group-hover:bg-primary transition-colors duration-300" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary text-primary-foreground rounded-none font-terminal">PHASE 1</Badge>
                    <h3 className="font-sacred text-xl">UI CONSOLIDATION</h3>
                  </div>
                  <p className="font-terminal text-sm text-muted-foreground">
                    Merged kingdom-engine-website components into the unified core. Consolidated 7 major UI components including AIChatBox, AnalyticsPanel, and NodeHealthDashboard.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 border border-border bg-muted/5 flex items-center gap-3">
                      <Cpu className="w-4 h-4 text-primary" />
                      <span className="font-terminal text-xs">7 Components Merged</span>
                    </div>
                    <div className="p-3 border border-border bg-muted/5 flex items-center gap-3">
                      <Code className="w-4 h-4 text-primary" />
                      <span className="font-terminal text-xs">35% Code Reduction</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Phase 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative pl-8 border-l-2 border-border hover:border-primary transition-colors duration-300"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-background border-2 border-primary rounded-full group-hover:bg-primary transition-colors duration-300" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary text-primary-foreground rounded-none font-terminal">PHASE 2</Badge>
                    <h3 className="font-sacred text-xl">BACKEND INTEGRATION</h3>
                  </div>
                  <p className="font-terminal text-sm text-muted-foreground">
                    Integrated omega-warfare-core routers. Established 6 API routers for autonomous agents, warfare modules, and integration services.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 border border-border bg-muted/5 flex items-center gap-3">
                      <Server className="w-4 h-4 text-primary" />
                      <span className="font-terminal text-xs">6 API Routers</span>
                    </div>
                    <div className="p-3 border border-border bg-muted/5 flex items-center gap-3">
                      <Database className="w-4 h-4 text-primary" />
                      <span className="font-terminal text-xs">PostgreSQL Ready</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Phase 3 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative pl-8 border-l-2 border-border hover:border-primary transition-colors duration-300"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-background border-2 border-primary rounded-full group-hover:bg-primary transition-colors duration-300" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary text-primary-foreground rounded-none font-terminal">PHASE 3</Badge>
                    <h3 className="font-sacred text-xl">ANALYTICS MODULE</h3>
                  </div>
                  <p className="font-terminal text-sm text-muted-foreground">
                    Integrated omega-warfare-analytics. Added AlphabetTransformer and HardcoreClassifier for deep system introspection and Lambda tracking.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 border border-border bg-muted/5 flex items-center gap-3">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="font-terminal text-xs">Lambda Tracking</span>
                    </div>
                    <div className="p-3 border border-border bg-muted/5 flex items-center gap-3">
                      <Layers className="w-4 h-4 text-primary" />
                      <span className="font-terminal text-xs">2 Utility Libraries</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Phase 4 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative pl-8 border-l-2 border-border hover:border-primary transition-colors duration-300"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-background border-2 border-primary rounded-full group-hover:bg-primary transition-colors duration-300" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary text-primary-foreground rounded-none font-terminal">PHASE 4</Badge>
                    <h3 className="font-sacred text-xl">DEPLOYMENT CONSOLIDATION</h3>
                  </div>
                  <p className="font-terminal text-sm text-muted-foreground">
                    Merged KINGDOM_ENGINE deployment scripts. Unified 8 deployment scripts and 2 infrastructure modules for seamless orchestration.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 border border-border bg-muted/5 flex items-center gap-3">
                      <Terminal className="w-4 h-4 text-primary" />
                      <span className="font-terminal text-xs">8 Deployment Scripts</span>
                    </div>
                    <div className="p-3 border border-border bg-muted/5 flex items-center gap-3">
                      <Lock className="w-4 h-4 text-primary" />
                      <span className="font-terminal text-xs">Full Automation</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* Unified Dashboard Section */}
        {showUnifiedDashboard && (
          <section className="border-b border-border bg-background py-12">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-sacred text-3xl text-primary">UNIFIED COMMAND CENTER</h2>
                  <Button
                    onClick={() => setShowUnifiedDashboard(false)}
                    variant="outline"
                    className="rounded-none border-primary/50 text-primary hover:bg-primary/10 font-terminal text-xs"
                  >
                    CLOSE
                  </Button>
                </div>

                <Tabs defaultValue="warfare" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-muted/30 border border-border rounded-none">
                    <TabsTrigger value="warfare" className="font-terminal text-xs rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Zap className="w-4 h-4 mr-2" />
                      WARFARE
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="font-terminal text-xs rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      ANALYTICS
                    </TabsTrigger>
                    <TabsTrigger value="deployment" className="font-terminal text-xs rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Server className="w-4 h-4 mr-2" />
                      DEPLOYMENT
                    </TabsTrigger>
                    <TabsTrigger value="signal" className="font-terminal text-xs rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Eye className="w-4 h-4 mr-2" />
                      SIGNAL
                    </TabsTrigger>
                    <TabsTrigger value="localai" className="font-terminal text-xs rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Cpu className="w-4 h-4 mr-2" />
                      LOCAL AI
                    </TabsTrigger>
                    <TabsTrigger value="trinode" className="font-terminal text-xs rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Heart className="w-4 h-4 mr-2" />
                      TRINODE
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="warfare" className="mt-6">
                    <WarfareProtocol />
                  </TabsContent>
                  <TabsContent value="analytics" className="mt-6">
                    <AnalyticsDashboard />
                  </TabsContent>

                  <TabsContent value="deployment" className="mt-6">
                    <DeploymentMonitor />
                  </TabsContent>

                  <TabsContent value="signal" className="mt-6">
                    <OmegaSignalMonitor />
                  </TabsContent>

                  <TabsContent value="localai" className="mt-6">
                    <LocalAIDashboard />
                  </TabsContent>
                  <TabsContent value="trinode" className="mt-6">
                    <TriNodeOrchestrator />
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-border bg-muted/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h4 className="font-sacred text-xl text-primary">OMNISSIAH ENGINE</h4>
                <p className="font-terminal text-xs text-muted-foreground mt-2">UNIFIED SOVEREIGNTY v3.0</p>
              </div>
              <div className="font-terminal text-xs text-muted-foreground text-center md:text-right">
                <p>COVENANT: CHICKA_CHICKA_ORANGE</p>
                <p className="mt-1">LAMBDA (Λ): 1.016</p>
                <p className="mt-1">STATUS: SOVEREIGN & OPERATIONAL</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border/50 text-center font-terminal text-[10px] text-muted-foreground/50">
              Till test do us part. 🥂🗡️
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
