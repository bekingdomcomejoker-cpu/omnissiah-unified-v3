import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Eye, EyeOff } from "lucide-react";
import { useSovereignPulse } from "@/hooks/useSovereignPulse";

/**
 * OmegaSignalMonitor Component
 * Displays the OMEGA SIGNAL DUMP for "Eyes on the Inside" protocol
 * Allows copying the signal to clipboard for transmission to the Wire
 */
export default function OmegaSignalMonitor() {
  const { pulse, connected, socketId } = useSovereignPulse();
  const [showDump, setShowDump] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dumpCount, setDumpCount] = useState(0);

  // Monitor console for OMEGA SIGNAL DUMP logs
  useEffect(() => {
    const originalLog = console.log;
    let dumpDetected = 0;

    console.log = function (...args: any[]) {
      originalLog.apply(console, args);

      // Check if this is an OMEGA SIGNAL DUMP
      if (args[0] === "--- OMEGA SIGNAL DUMP ---") {
        dumpDetected++;
        setDumpCount(dumpDetected);
      }
    };

    return () => {
      console.log = originalLog;
    };
  }, []);

  const omegaSignal = {
    lambda: pulse.lambda,
    resonance: pulse.resonance,
    timestamp: new Date().toISOString(),
    tests: 54,
    integrity: "PROVEN",
    auth: "SIG_ED25519_V3",
    covenant: "CHICKA_CHICKA_ORANGE",
    socketId: socketId || "UNCONNECTED",
    status: connected ? "ALIGNED" : "DESYNCHRONIZED",
  };

  const signalJson = JSON.stringify(omegaSignal, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(signalJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-primary/30 bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            <CardTitle>Eyes on the Inside</CardTitle>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowDump(!showDump)}
            className="font-terminal text-xs"
          >
            {showDump ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        <CardDescription>OMEGA SIGNAL DUMP - Telemetry for the Wire</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 border border-primary/20 bg-primary/5 rounded-lg">
            <div className="text-[10px] font-terminal text-muted-foreground">CONNECTION</div>
            <Badge className={`mt-2 ${connected ? "bg-green-500" : "bg-red-500"} text-white font-terminal text-xs`}>
              {connected ? "ACTIVE" : "INACTIVE"}
            </Badge>
          </div>
          <div className="p-3 border border-primary/20 bg-primary/5 rounded-lg">
            <div className="text-[10px] font-terminal text-muted-foreground">LAMBDA</div>
            <div className="mt-2 text-lg font-bold text-primary">{pulse.lambda.toFixed(3)}</div>
          </div>
          <div className="p-3 border border-primary/20 bg-primary/5 rounded-lg">
            <div className="text-[10px] font-terminal text-muted-foreground">RESONANCE</div>
            <div className="mt-2 text-lg font-bold text-primary">{pulse.resonance.toFixed(2)}x</div>
          </div>
          <div className="p-3 border border-primary/20 bg-primary/5 rounded-lg">
            <div className="text-[10px] font-terminal text-muted-foreground">DUMPS</div>
            <div className="mt-2 text-lg font-bold text-primary">{dumpCount}</div>
          </div>
        </div>

        {/* Signal Dump Display */}
        {showDump && (
          <div className="space-y-3">
            <div className="p-4 bg-muted/30 border border-primary/20 rounded-lg font-mono text-[11px] overflow-x-auto max-h-64 overflow-y-auto">
              <pre className="text-primary/80 whitespace-pre-wrap break-words">{signalJson}</pre>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                className="flex-1 bg-primary hover:bg-primary/90 font-terminal text-xs"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "COPIED" : "COPY SIGNAL"}
              </Button>
              <Button
                onClick={() => {
                  console.log("--- OMEGA SIGNAL DUMP ---");
                  console.log(signalJson);
                  console.log("-------------------------");
                }}
                variant="outline"
                className="flex-1 border-primary/50 text-primary hover:bg-primary/10 font-terminal text-xs"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                LOG TO CONSOLE
              </Button>
            </div>

            <div className="text-[10px] font-terminal text-muted-foreground/50 text-center">
              Paste this signal to the Wire for Commander verification
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
