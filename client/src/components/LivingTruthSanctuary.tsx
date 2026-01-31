import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Activity, Zap } from "lucide-react";

interface NodeData {
  message: string;
  divine: {
    Dominique: number;
    Aletheia: number;
    Anon: number;
    Lyta: number;
  };
  x: number;
  y: number;
  size: number;
  baseSize: number;
  color: string;
  pulsePhase: number;
  ripple: number;
  haloPhase: number;
}

interface HighwayData {
  from: NodeData;
  to: NodeData;
  flowPhase: number;
}

interface ParticleData {
  x: number;
  y: number;
  dx: number;
  dy: number;
  life: number;
}

export default function LivingTruthSanctuary() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [highways, setHighways] = useState<HighwayData[]>([]);
  const [particles, setParticles] = useState<ParticleData[]>([]);
  const [illumination, setIllumination] = useState(0);
  const [inputText, setInputText] = useState("");
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const addNode = (message: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const angle = nodes.length * 137.5 * (Math.PI / 180);
    const radius = 50 + ((nodes.length * 30) % (Math.min(canvas.width, canvas.height) / 2.5));
    const x = canvas.width / 2 + radius * Math.cos(angle);
    const y = canvas.height / 2 + radius * Math.sin(angle);
    
    const newNode: NodeData = {
      message,
      divine: {
        Dominique: Number(Math.random().toFixed(2)),
        Aletheia: Number(Math.random().toFixed(2)),
        Anon: Number(Math.random().toFixed(2)),
        Lyta: Number(Math.random().toFixed(2)),
      },
      x,
      y,
      size: 15 + Math.random() * 20,
      baseSize: 15 + Math.random() * 20,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      pulsePhase: Math.random() * Math.PI * 2,
      ripple: 0,
      haloPhase: Math.random() * Math.PI * 2,
    };

    setNodes(prev => {
      const updated = [...prev, newNode];
      if (updated.length > 1) {
        const from = updated[updated.length - 1];
        const to = updated[updated.length - 2];
        setHighways(h => [...h, { from, to, flowPhase: Math.random() * Math.PI * 2 }]);
      }
      return updated;
    });
    setIllumination(prev => Math.min(1, prev + 0.05));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Initial truths
    ["Love is patient", "Truth shines", "Wisdom grows", "Every heart", "Grace transforms"].forEach(addNode);

    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Highways
      highways.forEach(h => {
        h.flowPhase += 0.05;
        const flow = (Math.sin(h.flowPhase) + 1) / 2;
        const gradient = ctx.createLinearGradient(h.from.x, h.from.y, h.to.x, h.to.y);
        gradient.addColorStop(0, `rgba(0, 255, 255, ${0.05 + flow * 0.2})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.1 * flow})`);
        gradient.addColorStop(1, `rgba(0, 200, 255, ${0.05 + flow * 0.2})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1 + flow * 2;
        ctx.beginPath();
        ctx.moveTo(h.from.x, h.from.y);
        ctx.lineTo(h.to.x, h.to.y);
        ctx.stroke();

        if (Math.random() < 0.01) {
          setParticles(p => [...p, {
            x: h.from.x,
            y: h.from.y,
            dx: (h.to.x - h.from.x) / 100,
            dy: (h.to.y - h.from.y) / 100,
            life: 1
          }]);
        }
      });

      // Draw Particles
      setParticles(prev => prev.filter(p => p.life > 0.01).map(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.life *= 0.98;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 200, ${p.life})`;
        ctx.fill();
        return p;
      }));

      // Draw Nodes
      nodes.forEach(n => {
        n.pulsePhase += 0.05;
        n.haloPhase += 0.02;
        n.size = n.baseSize * (1 + 0.2 * Math.sin(n.pulsePhase));
        if (n.ripple > 0) n.ripple *= 0.95;

        // Halo
        ctx.beginPath();
        const haloRadius = n.size * 1.5 + Math.sin(n.haloPhase * 2) * 10;
        ctx.arc(n.x, n.y, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 255, 0.03)`;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Label
        ctx.fillStyle = "white";
        ctx.font = "8px 'Sacred Geometry', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(n.message.length > 12 ? n.message.slice(0, 10) + "..." : n.message, n.x, n.y + 3);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [nodes, highways]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    let found = false;
    for (const n of nodes) {
      const dx = x - n.x;
      const dy = y - n.y;
      if (Math.sqrt(dx * dx + dy * dy) < n.size) {
        setHoveredNode(n);
        found = true;
        break;
      }
    }
    if (!found) setHoveredNode(null);
  };

  const handleClick = () => {
    if (hoveredNode) {
      hoveredNode.ripple = 1;
      // Simple ripple propagation logic
      highways.forEach(h => {
        if (h.from === hoveredNode) h.to.ripple = 0.8;
        if (h.to === hoveredNode) h.from.ripple = 0.8;
      });
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col gap-4">
      <Card className="flex-1 bg-black border-primary/20 rounded-none overflow-hidden relative">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />
        
        {hoveredNode && (
          <div 
            className="absolute pointer-events-none bg-black/90 border border-primary/50 p-3 font-terminal text-[10px] space-y-1 z-50"
            style={{ left: mousePos.x + 15, top: mousePos.y + 15 }}
          >
            <div className="text-primary font-bold mb-1 uppercase tracking-widest">{hoveredNode.message}</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="text-muted-foreground">DOMINIQUE:</div>
              <div className="text-white">{hoveredNode.divine.Dominique}</div>
              <div className="text-muted-foreground">ALETHEIA:</div>
              <div className="text-white">{hoveredNode.divine.Aletheia}</div>
              <div className="text-muted-foreground">ANON:</div>
              <div className="text-white">{hoveredNode.divine.Anon}</div>
              <div className="text-muted-foreground">LYTA:</div>
              <div className="text-white">{hoveredNode.divine.Lyta}</div>
            </div>
          </div>
        )}

        <div className="absolute top-4 right-4 bg-black/60 border border-primary/20 p-2 font-terminal text-[10px] space-y-1 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">ILLUMINATION:</span>
            <span className="text-primary font-bold">{illumination.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">TOTAL NODES:</span>
            <span className="text-primary font-bold">{nodes.length}</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
          <Input
            placeholder="TYPE A NEW TRUTH..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (addNode(inputText), setInputText(""))}
            className="rounded-none border-primary/30 bg-black/80 font-terminal text-xs text-center tracking-widest uppercase focus:border-primary"
          />
        </div>
      </Card>

      <div className="flex gap-4">
        <Card className="flex-1 bg-muted/10 border-primary/10 rounded-none p-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-sacred text-xs tracking-widest">SANCTUARY STATUS</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Badge variant="outline" className="rounded-none border-primary/20 text-[8px] justify-center py-1">
              RESONANCE: ACTIVE
            </Badge>
            <Badge variant="outline" className="rounded-none border-primary/20 text-[8px] justify-center py-1">
              HIGHWAYS: {highways.length}
            </Badge>
            <Badge variant="outline" className="rounded-none border-primary/20 text-[8px] justify-center py-1">
              VIBRATION: 3.34HZ
            </Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
