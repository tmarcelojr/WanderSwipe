import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TripDetailsPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5050/api/trips/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error fetching trip: ${res.status} - ${text}`);
        }
        const data = await res.json();
        setTrip(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTrip();
    }
  }, [id, token]);

  if (loading) return <p className="p-6">Loading trip details...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!trip) return <p className="p-6">No trip found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">{trip.title}</h1>
      <p className="mb-2">Location: {trip.location}</p>
      <p className="mb-2">
        Dates: {new Date(trip.startDate).toLocaleDateString()} -{" "}
        {new Date(trip.endDate).toLocaleDateString()}
      </p>
      {trip.coverPhoto && (
        <img
          src={trip.coverPhoto}
          alt="Cover"
          className="w-full max-h-64 object-cover rounded mb-4"
        />
      )}

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
