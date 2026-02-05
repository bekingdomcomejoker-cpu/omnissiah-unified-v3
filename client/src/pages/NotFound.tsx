export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>
        <a href="/" className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700">
          Return Home
        </a>
      </div>
    </div>
  );
}
