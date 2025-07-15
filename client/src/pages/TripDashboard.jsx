import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function TripDashboard() {
  const { token, user, logout } = useAuth();
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5050/api/trips/my-trips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error fetching trips: ${res.status} - ${text}`);
        }
        const data = await res.json();
        setTrips(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTrips();
    }
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <div className="mb-6 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p>Start planning your adventures or revisit your past trips.</p>
        <button
          onClick={logout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Trips</h2>
        {loading && <p>Loading trips...</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {!loading && !error && trips.length === 0 && (
          <p>You have no trips yet. Create one!</p>
        )}
        <ul className="space-y-4">
          {trips.map((trip) => (
            <li
              key={trip._id}
              className="p-4 border rounded hover:shadow cursor-pointer"
            >
              <Link to={`/trip/${trip._id}`}>
                <h3 className="text-lg font-bold">{trip.title}</h3>
                <p>{trip.location}</p>
                <p>
                  {new Date(trip.startDate).toLocaleDateString()} -{" "}
                  {new Date(trip.endDate).toLocaleDateString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
