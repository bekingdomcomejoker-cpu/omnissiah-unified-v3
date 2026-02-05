import { useLocation } from "wouter";

export default function Landing() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 text-white">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Omnissiah Unified V3</h1>
          <p className="text-xl text-gray-400 mb-8">Omega Federation - Unified Sovereignty</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/overview")}
              className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Enter System
            </button>
            <button
              onClick={() => navigate("/omega-federation")}
              className="px-8 py-3 border border-blue-600 rounded-lg hover:bg-blue-600/10 transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
