import React from "react";
import ChessOfLife from "@/components/ChessOfLife";
import DashboardLayout from "@/components/DashboardLayout";

export default function DominionPage() {
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-12rem)] min-h-[700px]">
        <div className="mb-6">
          <h1 className="text-4xl font-sacred text-white tracking-widest uppercase">Dominion Protocol</h1>
          <p className="text-muted-foreground font-terminal text-xs tracking-widest mt-1">
            CHESS OF LIFE - SPIRITUAL ARCHETYPE & SOCIETAL POWER SIMULATION
          </p>
        </div>
        <ChessOfLife />
      </div>
    </DashboardLayout>
  );
}
