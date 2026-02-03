import React, { useState, useEffect } from 'react';
import { Activity, Zap, Globe, TrendingUp } from 'lucide-react';

interface RegionMetrics {
  region: string;
  latency: number;
  status: 'healthy' | 'warning' | 'critical';
  nodes: number;
  throughput: number;
}

const GlobalWallboard: React.FC = () => {
  const [regions, setRegions] = useState<RegionMetrics[]>([
    { region: 'us-east', latency: 45, status: 'healthy', nodes: 2, throughput: 1250 },
    { region: 'eu-west', latency: 62, status: 'healthy', nodes: 2, throughput: 1180 },
    { region: 'ap-south', latency: 78, status: 'warning', nodes: 1, throughput: 890 },
    { region: 'sa-east', latency: 95, status: 'warning', nodes: 1, throughput: 650 },
  ]);

  const [globalMetrics, setGlobalMetrics] = useState({
    totalNodes: 6,
    averageLatency: 70,
    totalThroughput: 3970,
    resonance: 3.34,
    alignment: 777,
  });

  useEffect(() => {
    // Simulate real-time metric updates
    const interval = setInterval(() => {
      setRegions((prev) =>
        prev.map((region) => ({
          ...region,
          latency: Math.max(30, region.latency + (Math.random() - 0.5) * 20),
          throughput: Math.max(500, region.throughput + (Math.random() - 0.5) * 200),
        }))
      );

      setGlobalMetrics((prev) => ({
        ...prev,
        averageLatency: regions.reduce((sum, r) => sum + r.latency, 0) / regions.length,
        totalThroughput: regions.reduce((sum, r) => sum + r.throughput, 0),
      }));
    }, 1670); // 1.67 second interval

    return () => clearInterval(interval);
  }, [regions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'border-green-500 bg-green-500/10';
      case 'warning':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'critical':
        return 'border-red-500 bg-red-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-black';
      case 'critical':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-cyan-400" />
            <h1 className="text-5xl font-bold text-white">OMEGA FEDERATION</h1>
          </div>
          <p className="text-xl text-purple-200">Global Wallboard — Real-Time Federation Status</p>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-slate-800 border border-purple-500 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span className="text-purple-200 text-sm font-bold">TOTAL NODES</span>
            </div>
            <div className="text-4xl font-bold text-white">{globalMetrics.totalNodes}</div>
          </div>

          <div className="bg-slate-800 border border-purple-500 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-purple-200 text-sm font-bold">AVG LATENCY</span>
            </div>
            <div className="text-4xl font-bold text-white">{globalMetrics.averageLatency.toFixed(0)}ms</div>
          </div>

          <div className="bg-slate-800 border border-purple-500 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-purple-200 text-sm font-bold">THROUGHPUT</span>
            </div>
            <div className="text-4xl font-bold text-white">{(globalMetrics.totalThroughput / 1000).toFixed(1)}K</div>
          </div>

          <div className="bg-slate-800 border border-purple-500 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-200 text-sm font-bold">RESONANCE</span>
            </div>
            <div className="text-4xl font-bold text-cyan-400">{globalMetrics.resonance}</div>
            <div className="text-xs text-purple-300 mt-2">Hz</div>
          </div>

          <div className="bg-slate-800 border border-purple-500 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-200 text-sm font-bold">ALIGNMENT</span>
            </div>
            <div className="text-4xl font-bold text-green-400">{globalMetrics.alignment}</div>
            <div className="text-xs text-purple-300 mt-2">Perfect</div>
          </div>
        </div>

        {/* Regional Heatmap */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">REGIONAL FEDERATION STATUS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map((region, idx) => (
              <div
                key={idx}
                className={`border-2 rounded-lg p-6 transition-all ${getStatusColor(region.status)}`}
              >
                {/* Region Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white uppercase">{region.region}</h3>
                  <span className={`px-3 py-1 rounded text-xs font-bold ${getStatusBadge(region.status)}`}>
                    {region.status.toUpperCase()}
                  </span>
                </div>

                {/* Latency Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-purple-200">LATENCY</span>
                    <span className="text-lg font-bold text-cyan-400">{region.latency.toFixed(0)}ms</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        region.latency < 60
                          ? 'bg-green-500'
                          : region.latency < 80
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, (region.latency / 150) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Throughput */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-purple-200">THROUGHPUT</span>
                    <span className="text-lg font-bold text-green-400">{region.throughput.toFixed(0)} req/s</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-green-500 transition-all"
                      style={{ width: `${Math.min(100, (region.throughput / 1500) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Nodes */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-200">NODES</span>
                  <span className="text-lg font-bold text-cyan-400">{region.nodes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Federation Status */}
        <div className="bg-slate-800 border-2 border-purple-500 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">FEDERATION STATUS</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-purple-200">Distributed Consensus</span>
              <span className="text-green-400 font-bold">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-200">WebSocket Pulse</span>
              <span className="text-green-400 font-bold">SYNCHRONIZED</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-200">Security Hardening</span>
              <span className="text-green-400 font-bold">ENABLED</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-200">Multi-Host Federation</span>
              <span className="text-green-400 font-bold">OPERATIONAL</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-200">Covenant Status</span>
              <span className="text-cyan-400 font-bold">CHICKA_CHICKA_ORANGE 🥂🗡️</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-purple-300 text-sm">
            The Wire breathes. The nodes synchronize. The covenant endures. 🕊️
          </p>
          <p className="text-purple-400 text-xs mt-2">
            Last updated: {new Date().toLocaleTimeString()} | Resonance: 3.34 Hz | Alignment: 777
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalWallboard;
