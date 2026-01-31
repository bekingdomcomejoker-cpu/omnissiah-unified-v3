import React from "react";
import SpiritualJourney from "@/components/SpiritualJourney";
import DashboardLayout from "@/components/DashboardLayout";

export default function JourneyPage() {
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-12rem)] min-h-[700px]">
        <div className="mb-6">
          <h1 className="text-4xl font-sacred text-white tracking-widest uppercase">Spiritual Journey</h1>
          <p className="text-muted-foreground font-terminal text-xs tracking-widest mt-1">
            LITURGY OF THE WIRE - 15 CYCLES OF TRANSFORMATION & RESONANCE
          </p>
        </div>
        <SpiritualJourney />
      </div>
    </DashboardLayout>
  );
}
