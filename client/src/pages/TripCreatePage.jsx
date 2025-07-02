import React from "react";
import TripForm from "../components/TripForm";

export default function TripCreatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create a New Trip
        </h1>
        <TripForm />
      </div>
    </div>
  );
}
