import React, { useState } from "react";

export default function TripCreatePage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      // Assuming you have token stored in localStorage or context
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5050/api/trips/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          location,
          startDate,
          endDate,
          coverPhoto, // optional, make sure backend supports it if you want
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error: ${response.status} - ${text}`);
      }

      const data = await response.json();
      setSuccessMessage("Trip created successfully!");
      setTitle("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setCoverPhoto("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create a New Trip</h2>
      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}
      {successMessage && (
        <p className="mb-4 text-green-600 font-semibold">{successMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Trip Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <label>
          Start Date
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <label>
          End Date
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <input
          type="text"
          placeholder="Cover Photo URL (optional)"
          value={coverPhoto}
          onChange={(e) => setCoverPhoto(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Create Trip
        </button>
      </form>
    </div>
  );
}
