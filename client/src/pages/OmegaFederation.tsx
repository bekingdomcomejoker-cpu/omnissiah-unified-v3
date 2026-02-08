import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Zap, Radio, Eye, Skull } from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: "COMMAND" | "STRIKE" | "LISTENER" | "SHADOW";
  x: number;
  y: number;
  status: "ACTIVE" | "INACTIVE" | "DEGRADED";
}

interface Edge {
  source: string;
  target: string;
  label: string;
}

interface VisualizationData {
  nodes: Node[];
  edges: Edge[];
  resonance: number;
  generation: number;
  maxGenerations: number;
}

const nodeTypeIcons: Record<string, React.ReactNode> = {
  COMMAND: <Zap className="w-4 h-4" />,
  STRIKE: <AlertCircle className="w-4 h-4" />,
  LISTENER: <Radio className="w-4 h-4" />,
  SHADOW: <Skull className="w-4 h-4" />
};

const nodeTypeColors: Record<string, string> = {
  COMMAND: "bg-blue-600",
  STRIKE: "bg-red-600",
  LISTENER: "bg-green-600",
  SHADOW: "bg-purple-600"
};

export default function OmegaFederation() {
  const [vizData, setVizData] = useState<VisualizationData | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching node visualization data
    const mockData: VisualizationData = {
      nodes: [
        { id: "node_0", label: "The Wire", type: "COMMAND", x: 200, y: 100, status: "ACTIVE" },
        { id: "node_1", label: "The Architect", type: "STRIKE", x: 400, y: 100, status: "ACTIVE" },
        { id: "node_2", label: "The Mirror", type: "LISTENER", x: 300, y: 250, status: "ACTIVE" },
        { id: "node_3", label: "The Warfare Module", type: "SHADOW", x: 100, y: 250, status: "ACTIVE" }
      ],
      edges: [
        { source: "node_0", target: "node_1", label: "transmission" },
        { source: "node_0", target: "node_2", label: "reflection" },
        { source: "node_1", target: "node_3", label: "execution" },
        { source: "node_2", target: "node_3", label: "feedback" }
      ],
      resonance: 1.67,
      generation: 1,
      maxGenerations: 7
    };

    setVizData(mockData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Initializing Omega Federation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Omega Federation</h1>
          <p className="text-gray-400">Dynamic Node Visualization & Synchronization</p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Resonance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vizData?.resonance}</div>
              <p className="text-xs text-gray-500 mt-1">Harmony Ridge</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Nodes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vizData?.nodes.length}</div>
              <p className="text-xs text-gray-500 mt-1">Federation Status</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vizData?.generation}/{vizData?.maxGenerations}</div>
              <p className="text-xs text-gray-500 mt-1">Propagation Level</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-orange-600">CHICKA CHICKA</Badge>
              <p className="text-xs text-gray-500 mt-1">Operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Node Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SVG Canvas */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle>Node Topology</CardTitle>
                <CardDescription>Omega Spine-Leaf Mesh Architecture</CardDescription>
              </CardHeader>
              <CardContent>
                <svg width="100%" height="400" className="bg-slate-950 rounded border border-slate-700">
                  {/* Draw edges */}
                  {vizData?.edges.map((edge, idx) => {
                    const sourceNode = vizData.nodes.find(n => n.id === edge.source);
                    const targetNode = vizData.nodes.find(n => n.id === edge.target);
                    if (!sourceNode || !targetNode) return null;

                    return (
                      <g key={idx}>
                        <line
                          x1={sourceNode.x}
                          y1={sourceNode.y}
                          x2={targetNode.x}
                          y2={targetNode.y}
                          stroke="#64748b"
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                        />
                        <text
                          x={(sourceNode.x + targetNode.x) / 2}
                          y={(sourceNode.y + targetNode.y) / 2 - 5}
                          fill="#94a3b8"
                          fontSize="10"
                          textAnchor="middle"
                        >
                          {edge.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Draw nodes */}
                  {vizData?.nodes.map((node) => (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="30"
                        fill={nodeTypeColors[node.type]}
                        opacity="0.8"
                        className="hover:opacity-100 transition-opacity"
                      />
                      <text
                        x={node.x}
                        y={node.y + 5}
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {node.type[0]}
                      </text>
                      <text
                        x={node.x}
                        y={node.y + 50}
                        fill="#e2e8f0"
                        fontSize="11"
                        textAnchor="middle"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}

                  {/* Arrow marker */}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              </CardContent>
            </Card>
          </div>

          {/* Node Details Sidebar */}
          <div>
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg">Node Details</CardTitle>
                <CardDescription>
                  {selectedNode ? "Selected Node Information" : "Click a node to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedNode ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Node ID</p>
                      <p className="font-mono text-sm">{selectedNode.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Label</p>
                      <p className="text-lg font-semibold">{selectedNode.label}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Type</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-3 h-3 rounded ${nodeTypeColors[selectedNode.type]}`}></div>
                        <span className="font-mono text-sm">{selectedNode.type}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <Badge
                        className={
                          selectedNode.status === "ACTIVE"
                            ? "bg-green-600"
                            : selectedNode.status === "DEGRADED"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        }
                      >
                        {selectedNode.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Position</p>
                      <p className="font-mono text-sm">
                        ({selectedNode.x}, {selectedNode.y})
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Select a node to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Node List */}
            <Card className="bg-slate-900 border-slate-700 mt-4">
              <CardHeader>
                <CardTitle className="text-sm">All Nodes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {vizData?.nodes.map((node) => (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-2 rounded cursor-pointer transition-colors ${
                        selectedNode?.id === node.id
                          ? "bg-slate-700 border border-orange-500"
                          : "bg-slate-800 hover:bg-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${nodeTypeColors[node.type]}`}></div>
                        <span className="text-sm font-medium">{node.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-4">{node.type}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
