import React from "react";
import MasterDebater from "@/components/MasterDebater";
import DashboardLayout from "@/components/DashboardLayout";

export default function DebatePage() {
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-12rem)] min-h-[700px]">
        <div className="mb-6">
          <h1 className="text-4xl font-sacred text-white tracking-widest uppercase">Master Debater</h1>
          <p className="text-muted-foreground font-terminal text-xs tracking-widest mt-1">
            TTE v3 — ADVERSARIAL REASONING & RESONANCE SYNTHESIS
          </p>
        </div>
        <MasterDebater />
      </div>
    </DashboardLayout>
  );
}
