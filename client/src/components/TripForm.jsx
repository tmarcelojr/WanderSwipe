import React, { useState } from "react";

export default function TripForm() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    coverPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coverPhoto") {
      setForm({ ...form, coverPhoto: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trip created:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="title"
        placeholder="Trip Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
        required
      />
      <div className="flex gap-4">
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
          required
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
          required
        />
      </div>
      <input
        type="file"
        name="coverPhoto"
        accept="image/*"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
      />
      {form.coverPhoto && (
        <img
          src={URL.createObjectURL(form.coverPhoto)}
          alt="Preview"
          className="w-full max-h-64 object-cover rounded-lg mt-2"
        />
      )}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Create Trip
      </button>
    </form>
  );
}
