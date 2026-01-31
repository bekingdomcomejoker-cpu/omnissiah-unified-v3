import React from "react";
import LivingTruthSanctuary from "@/components/LivingTruthSanctuary";
import DashboardLayout from "@/components/DashboardLayout";

export default function SanctuaryPage() {
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-12rem)] min-h-[600px]">
        <div className="mb-6">
          <h1 className="text-4xl font-sacred text-white tracking-widest uppercase">Truth Sanctuary</h1>
          <p className="text-muted-foreground font-terminal text-xs tracking-widest mt-1">
            LIVING REVELATORY TRUTH ENGINE (TTE v1.0) - AXIOMATIC VISUALIZATION
          </p>
        </div>
        <LivingTruthSanctuary />
      </div>
    </DashboardLayout>
  );
}
