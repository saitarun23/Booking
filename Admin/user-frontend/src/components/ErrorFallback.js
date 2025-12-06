import { useNavigate } from "react-router-dom";

export default function ErrorFallback({ error, onRetry }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        <svg
          className="w-16 h-16 mx-auto text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
        <p className="text-gray-600 mb-4">Something went wrong</p>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded text-sm mb-4">
            {error}
          </div>
        )}

        <div className="space-y-2 flex flex-col">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Try Again
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
