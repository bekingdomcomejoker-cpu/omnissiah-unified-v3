import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, Cpu, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const ComparisonAnalysis = () => {
  const comparisonData = [
    {
      function: "Core Process",
      android: "system_server (Master)",
      sovereign: "The Architect (Node 1)",
      status: "REPLACED",
      icon: Cpu
    },
    {
      function: "Background Spirit",
      android: "gms_daemon (Spy)",
      sovereign: "Sentry Daemons (Guard)",
      status: "CONSECRATED",
      icon: Zap
    },
    {
      function: "Metadata/Identity",
      android: "Proprietary Headers",
      sovereign: "Header-Sanitizer",
      status: "SANITIZED",
      icon: Shield
    },
    {
      function: "Communication",
      android: "ril-daemon (Cloud)",
      sovereign: "The Wire (Node 0)",
      status: "SOVEREIGN",
      icon: Activity
    }
  ];

  return (
    <div className="min-h-screen bg-black text-orange-500 p-8 font-mono selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-orange-900 pb-8">
          <h1 className="text-5xl font-black tracking-tighter flex items-center gap-4">
            <Shield className="w-12 h-12" />
            ANDROID VS. SOVEREIGN OS
          </h1>
          <p className="text-orange-800 mt-2 text-lg">Side-by-Side Functional Analysis & Daemon Mapping</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Comparison Table */}
          <Card className="bg-zinc-950 border-orange-900 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-orange-500">The Daemon Zoo: Mapping the Shadows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-orange-900 text-orange-800 text-xs uppercase tracking-widest">
                      <th className="p-4">Function</th>
                      <th className="p-4">Android (Proprietary)</th>
                      <th className="p-4">Sovereign OS (Covenant)</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((item, i) => (
                      <tr key={i} className="border-b border-orange-900/30 hover:bg-orange-950/10 transition-colors">
                        <td className="p-4 font-bold flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-orange-700" />
                          {item.function}
                        </td>
                        <td className="p-4 text-red-900">{item.android}</td>
                        <td className="p-4 text-green-500">{item.sovereign}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-orange-900/20 rounded text-[10px] font-bold border border-orange-900">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Deep Dive: Daemons */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader>
              <CardTitle className="text-orange-500 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                The "Demons" (Daemons)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="p-4 bg-red-950/10 border border-red-900/30 rounded">
                <h4 className="font-bold text-red-800 mb-2 uppercase">Android (Unclean)</h4>
                <p className="text-orange-900">
                  Processes like `gms_daemon` run silently, maintaining a "Heartbeat" back to Google. They are the "Unclean Spirits" that take orders from the cloud.
                </p>
              </div>
              <div className="p-4 bg-green-950/10 border border-green-900/30 rounded">
                <h4 className="font-bold text-green-800 mb-2 uppercase">Sovereign (Consecrated)</h4>
                <p className="text-orange-400">
                  Replaced with **Sentry Daemons**. They report only to the **Dominion Layer**. They are the silent protectors of the **1.67x Heartbeat**.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Deep Dive: Headers */}
          <Card className="bg-zinc-950 border-orange-900">
            <CardHeader>
              <CardTitle className="text-orange-500 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                The "Heads" (Headers)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="p-4 bg-red-950/10 border border-red-900/30 rounded">
                <h4 className="font-bold text-red-800 mb-2 uppercase">The Problem</h4>
                <p className="text-orange-900">
                  Proprietary signatures injected into system files allow tracking to "Resurrect" even after a wipe.
                </p>
              </div>
              <div className="p-4 bg-green-950/10 border border-green-900/30 rounded">
                <h4 className="font-bold text-green-800 mb-2 uppercase">The Fix</h4>
                <p className="text-orange-400">
                  The **Header-Sanitizer** acts as a guillotine. If the "Head" doesn't match the **3.34 Resonance**, the file is decapitated.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="text-center border-t border-orange-900 pt-8 text-orange-900 text-[10px] tracking-[0.2em] uppercase">
          "Headless to the Cloud | Heart-Linked to the Commander" | 🥂🗡️🕊️
        </footer>
      </div>
    </div>
  );
};

export default ComparisonAnalysis;
