export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Omnissiah Unified V3</h1>
        <p className="text-gray-400 mb-8">Overview Dashboard</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">System Status</h2>
            <p className="text-gray-400">All systems operational</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Federation</h2>
            <p className="text-gray-400">Omega Federation Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
