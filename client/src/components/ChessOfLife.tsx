import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Heart, Zap, Scale, Sparkles, Swords } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PieceType = "P" | "R" | "N" | "B" | "Q" | "K";
type Color = "white" | "black";

interface Piece {
  type: PieceType;
  color: Color;
  id: string;
}

interface Square {
  piece: Piece | null;
  x: number;
  y: number;
}

const INITIAL_BOARD: (Piece | null)[][] = [
  [
    { type: "R", color: "black", id: "br1" },
    { type: "N", color: "black", id: "bn1" },
    { type: "B", color: "black", id: "bb1" },
    { type: "Q", color: "black", id: "bq" },
    { type: "K", color: "black", id: "bk" },
    { type: "B", color: "black", id: "bb2" },
    { type: "N", color: "black", id: "bn2" },
    { type: "R", color: "black", id: "br2" },
  ],
  Array(8).fill(null).map((_, i) => ({ type: "P", color: "black", id: `bp${i}` })),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null).map((_, i) => ({ type: "P", color: "white", id: `wp${i}` })),
  [
    { type: "R", color: "white", id: "wr1" },
    { type: "N", color: "white", id: "wn1" },
    { type: "B", color: "white", id: "wb1" },
    { type: "Q", color: "white", id: "wq" },
    { type: "K", color: "white", id: "wk" },
    { type: "B", color: "white", id: "wb2" },
    { type: "N", color: "white", id: "wn2" },
    { type: "R", color: "white", id: "wr2" },
  ],
];

const PIECE_ICONS: Record<PieceType, string> = {
  P: "♟", R: "♜", N: "♞", B: "♝", Q: "♛", K: "♚"
};

const PIECE_NAMES: Record<PieceType, string> = {
  P: "Flesh / Servant",
  R: "Will / Faith",
  N: "Intuition / Innovation",
  B: "Imagination / Doctrine",
  Q: "Desire / Compassion",
  K: "Logos / Will of God"
};

export default function ChessOfLife() {
  const [board, setBoard] = useState<(Piece | null)[][]>(INITIAL_BOARD);
  const [selected, setSelected] = useState<{ x: number, y: number } | null>(null);
  const [turn, setTurn] = useState<Color>("white");
  const [meters, setMeters] = useState({
    love: 50,
    wisdom: 50,
    justice: 50,
    dominion: 50,
    faith: 50
  });
  const [alignment, setAlignment] = useState(0); // -100 (Shadow) to 100 (Light)
  const [history, setHistory] = useState<string[]>([]);

  const handleSquareClick = (x: number, y: number) => {
    const piece = board[y][x];

    if (selected) {
      if (selected.x === x && selected.y === y) {
        setSelected(null);
        return;
      }

      // Move piece
      const newBoard = board.map(row => [...row]);
      const movingPiece = newBoard[selected.y][selected.x];
      
      if (movingPiece && movingPiece.color === turn) {
        const targetPiece = newBoard[y][x];
        
        // Update Meters based on move
        updateMeters(movingPiece, targetPiece);
        
        newBoard[y][x] = movingPiece;
        newBoard[selected.y][selected.x] = null;
        setBoard(newBoard);
        setTurn(turn === "white" ? "black" : "white");
        setHistory(prev => [`${movingPiece.type} to ${String.fromCharCode(97 + x)}${8 - y}`, ...prev]);
      }
      
      setSelected(null);
    } else if (piece && piece.color === turn) {
      setSelected({ x, y });
    }
  };

  const updateMeters = (piece: Piece, captured: Piece | null) => {
    setMeters(prev => {
      const next = { ...prev };
      if (captured) {
        next.justice += 5;
        next.dominion += 10;
        next.love -= 5;
        setAlignment(a => Math.max(-100, a - 10));
      } else {
        next.faith += 2;
        next.wisdom += 3;
        setAlignment(a => Math.min(100, a + 5));
      }
      
      // Piece specific logic
      if (piece.type === "Q") next.love += 5;
      if (piece.type === "B") next.wisdom += 5;
      if (piece.type === "R") next.faith += 5;
      
      return {
        love: Math.min(100, Math.max(0, next.love)),
        wisdom: Math.min(100, Math.max(0, next.wisdom)),
        justice: Math.min(100, Math.max(0, next.justice)),
        dominion: Math.min(100, Math.max(0, next.dominion)),
        faith: Math.min(100, Math.max(0, next.faith)),
      };
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Meters Sidebar */}
      <Card className="lg:col-span-3 bg-black border-primary/20 rounded-none flex flex-col">
        <CardHeader className="border-b border-primary/10">
          <CardTitle className="font-sacred text-xs tracking-widest uppercase flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> SPIRITUAL METERS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-6 flex-1">
          <Meter label="LOVE" value={meters.love} icon={<Heart className="w-3 h-3" />} />
          <Meter label="WISDOM" value={meters.wisdom} icon={<Zap className="w-3 h-3" />} />
          <Meter label="JUSTICE" value={meters.justice} icon={<Scale className="w-3 h-3" />} />
          <Meter label="DOMINION" value={meters.dominion} icon={<Swords className="w-3 h-3" />} />
          <Meter label="FAITH" value={meters.faith} icon={<Sparkles className="w-3 h-3" />} />
          
          <div className="pt-6 border-t border-primary/10">
            <div className="flex justify-between text-[10px] font-terminal mb-2 tracking-widest">
              <span className="text-muted-foreground">SHADOW</span>
              <span className="text-primary">ALIGNMENT</span>
              <span className="text-muted-foreground">LIGHT</span>
            </div>
            <div className="relative h-2 bg-muted/20 overflow-hidden">
              <motion.div 
                className="absolute top-0 bottom-0 bg-primary"
                animate={{ 
                  left: alignment >= 0 ? "50%" : `${50 + alignment/2}%`,
                  right: alignment >= 0 ? `${50 - alignment/2}%` : "50%"
                }}
              />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Chess Board */}
      <div className="lg:col-span-6 flex flex-col items-center justify-center bg-black/40 border border-primary/10 p-4 relative overflow-hidden">
        <div className="grid grid-cols-8 border-4 border-primary/20 shadow-[0_0_50px_rgba(var(--primary),0.1)]">
          {board.map((row, y) => 
            row.map((piece, x) => {
              const isBlack = (x + y) % 2 === 1;
              const isSelected = selected?.x === x && selected?.y === y;
              return (
                <motion.div
                  key={`${x}-${y}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSquareClick(x, y)}
                  className={`
                    w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-3xl md:text-4xl cursor-pointer relative
                    ${isBlack ? "bg-muted/10" : "bg-white/5"}
                    ${isSelected ? "ring-2 ring-primary ring-inset bg-primary/20" : ""}
                  `}
                >
                  <span className="absolute top-0.5 left-1 text-[8px] font-terminal opacity-30">
                    {String.fromCharCode(97 + x)}{8 - y}
                  </span>
                  {piece && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`${piece.color === "white" ? "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" : "text-white/40"}`}
                    >
                      {PIECE_ICONS[piece.type]}
                    </motion.span>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
        
        <div className="mt-6 flex gap-4">
          <Badge variant="outline" className="rounded-none font-terminal text-[10px] tracking-widest border-primary/20">
            TURN: {turn.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="rounded-none font-terminal text-[10px] tracking-widest border-primary/20">
            MODE: DOMINION PROTOCOL
          </Badge>
        </div>
      </div>

      {/* History & Info Sidebar */}
      <Card className="lg:col-span-3 bg-black border-primary/20 rounded-none flex flex-col">
        <CardHeader className="border-b border-primary/10">
          <CardTitle className="font-sacred text-xs tracking-widest uppercase flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> PIECE ARCHETYPES
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="space-y-2 mb-6">
            {selected && board[selected.y][selected.x] && (
              <div className="p-3 bg-primary/5 border border-primary/20 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-[10px] font-terminal text-primary mb-1 uppercase tracking-widest">Selected Archetype</div>
                <div className="text-xs font-sacred text-white uppercase">{PIECE_NAMES[board[selected.y][selected.x]!.type]}</div>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-auto custom-scrollbar">
            <div className="text-[10px] font-terminal text-muted-foreground mb-2 uppercase tracking-widest">Resonance Log</div>
            <div className="space-y-1">
              <AnimatePresence initial={false}>
                {history.map((move, i) => (
                  <motion.div 
                    key={history.length - i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] font-terminal text-white/60 border-l border-primary/20 pl-2 py-1"
                  >
                    <span className="text-primary/40 mr-2">[{history.length - i}]</span> {move}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="mt-4 rounded-none border-primary/20 font-terminal text-[10px] tracking-widest uppercase"
            onClick={() => {
              setBoard(INITIAL_BOARD);
              setMeters({ love: 50, wisdom: 50, justice: 50, dominion: 50, faith: 50 });
              setAlignment(0);
              setHistory([]);
              setTurn("white");
            }}
          >
            RESET PROTOCOL
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Meter({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-terminal tracking-widest">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          {icon} {label}
        </span>
        <span className="text-primary font-bold">{value}%</span>
      </div>
      <Progress value={value} className="h-1 rounded-none bg-primary/10" />
    </div>
  );
}

function Activity({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
