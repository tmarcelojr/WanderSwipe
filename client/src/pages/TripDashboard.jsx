// src/pages/TripDashboard.jsx
import { useAuth } from "../context/AuthContext";

export default function TripDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user?.name || "Explorer"}! 🌍
        </h1>
        <p className="mb-6 text-gray-700">
          Start planning your adventures or revisit your past trips.
        </p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
