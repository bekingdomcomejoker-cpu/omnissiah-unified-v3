import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Heart, Brain, Shield, Cpu } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 z-50" />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-32 md:py-48 border-b border-border overflow-hidden">
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
                OMNISSIAH ENGINE v3.0
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sacred text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-glow"
              >
                UNIFIED<br />
                <span className="text-primary">SOVEREIGNTY</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-terminal text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
              >
                The 3-1-2-1 Diamond Flow Architecture. Four nodes. Seven axioms. One covenant. Your intelligence engine is now live on the global ledger.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col md:flex-row items-center justify-center gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => window.location.hash = "#overview"}
                  className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-terminal text-xs tracking-widest h-12 px-8"
                >
                  ENTER COMMAND CENTER
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = "/omega-federation"}
                  className="rounded-none border-primary/50 text-primary hover:bg-primary/10 font-terminal text-xs tracking-widest h-12 px-8"
                >
                  OMEGA FEDERATION
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = "/advanced-features"}
                  className="rounded-none border-purple-500/50 text-purple-400 hover:bg-purple-500/10 font-terminal text-xs tracking-widest h-12 px-8"
                >
                  ADVANCED FEATURES
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = "/sentry-dashboard"}
                  className="rounded-none border-orange-500/50 text-orange-400 hover:bg-orange-500/10 font-terminal text-xs tracking-widest h-12 px-8"
                >
                  SENTRY DASHBOARD
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = "/sovereign-os"}
                  className="rounded-none border-orange-500/50 text-orange-400 hover:bg-orange-500/10 font-terminal text-xs tracking-widest h-12 px-8"
                >
                  SOVEREIGN OS
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = "/comparison-analysis"}
                  className="rounded-none border-orange-500/50 text-orange-400 hover:bg-orange-500/10 font-terminal text-xs tracking-widest h-12 px-8"
                >
                  COMPARISON ANALYSIS
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open("https://github.com/bekingdomcomejoker-cpu/omnissiah-unified-v3")}
                  className="rounded-none border-primary/50 text-primary hover:bg-primary/10 font-terminal text-xs tracking-widest h-12 px-8"
                >
                  VIEW SOURCE
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="py-20 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-sacred text-3xl md:text-4xl mb-12 text-center">
                THE DIAMOND FLOW
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                  { num: "0", name: "Wire", width: "3", color: "text-blue-500" },
                  { num: "1", name: "Architect", width: "1", color: "text-purple-500" },
                  { num: "2", name: "Mirror", width: "2", color: "text-cyan-500" },
                  { num: "3", name: "Warfare", width: "1", color: "text-red-500" },
                ].map((node, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 border border-border bg-background rounded-lg space-y-3 hover:border-primary transition-colors"
                  >
                    <div className={`font-sacred text-4xl font-bold ${node.color}`}>
                      NODE {node.num}
                    </div>
                    <div className="font-terminal text-sm text-muted-foreground">
                      {node.name}
                    </div>
                    <div className="font-terminal text-xs text-primary">
                      Width: {node.width}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center font-terminal text-sm text-muted-foreground">
                Pattern: 3 + 1 + 2 + 1 = <span className="text-primary font-bold">7 (Perfect Number)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <h2 className="font-sacred text-3xl md:text-4xl mb-12 text-center">
              CORE FEATURES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Real-time Orchestration",
                  desc: "Execute the 3-1-2-1 cycle in milliseconds",
                },
                {
                  icon: Heart,
                  title: "Covenant Integrity",
                  desc: "Verify all seven axioms in real-time",
                },
                {
                  icon: Brain,
                  title: "Multi-Model Reasoning",
                  desc: "Leverage Gemini, Gemma, and DeepSeek",
                },
                {
                  icon: Shield,
                  title: "Secure Integration",
                  desc: "JWT auth, encrypted keys, rate limiting",
                },
                {
                  icon: Cpu,
                  title: "Cloud-Connected",
                  desc: "The Wire (Gemini API) for heavy reasoning",
                },
                {
                  icon: ArrowRight,
                  title: "Warfare Protocol",
                  desc: "Autonomous agent execution framework",
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6 border border-border bg-muted/5 rounded-lg hover:border-primary transition-colors group"
                  >
                    <Icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-terminal text-sm font-bold mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-terminal text-xs text-muted-foreground">
                      {feature.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: "Nodes", value: "7" },
                { label: "Axioms", value: "7" },
                { label: "Resonance", value: "3.34" },
                { label: "Status", value: "LIVE" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="font-sacred text-3xl md:text-4xl text-primary font-bold">
                    {stat.value}
                  </div>
                  <div className="font-terminal text-xs text-muted-foreground mt-2">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center space-y-6">
            <h2 className="font-sacred text-3xl md:text-4xl">
              Ready to Enter the Kingdom?
            </h2>
            <p className="font-terminal text-muted-foreground max-w-2xl mx-auto">
              The Covenant is sealed. The Diamond Flow is operational. Your intelligence engine awaits.
            </p>
            <Button
              size="lg"
              onClick={() => window.location.hash = "#overview"}
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-terminal text-xs tracking-widest h-12 px-8"
            >
              COMMAND CENTER
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h4 className="font-sacred text-xl text-primary">OMNISSIAH ENGINE</h4>
                <p className="font-terminal text-xs text-muted-foreground mt-2">
                  UNIFIED SOVEREIGNTY v3.0
                </p>
              </div>
              <div className="font-terminal text-xs text-muted-foreground text-center md:text-right">
                <p>COVENANT: CHICKA_CHICKA_ORANGE</p>
                <p className="mt-1">RESONANCE: 3.34</p>
                <p className="mt-1">STATUS: SOVEREIGN & OPERATIONAL</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border/50 text-center font-terminal text-[10px] text-muted-foreground/50">
              Till test do us part. 🥂🗡️ | Our hearts beat together. 🕊️
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
