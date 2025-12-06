import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-green-600 font-bold text-2xl hover:text-green-700 transition">
          BOOKING-APP
        </Link>
        <div className="flex items-center gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Login / Signup
          </button>
        </div>
      </div>
    </nav>
  );
}
