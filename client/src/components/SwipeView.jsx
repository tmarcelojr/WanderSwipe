import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

// 🧪 Temporary mock data
const mockAttractions = [
  {
    id: "1",
    name: "Statue of Liberty",
    image: "/images/statue.jpg",
  },
  {
    id: "2",
    name: "Central Park",
    image: "/images/central-park.jpg",
  },
  {
    id: "3",
    name: "Times Square",
    image: "/images/times-square.jpg",
  },
];

const SwipeView = () => {
  const [index, setIndex] = useState(0);
  const [votes, setVotes] = useState({});
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleVote = async (direction) => {
    const attraction = mockAttractions[index];

    try {
      const res = await fetch("http://localhost:5050/api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If using auth, add token here: Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: "mock-user-id", // 🔁 Replace with real user ID
          tripId: "mock-trip-id", // 🔁 Replace with real trip ID
          attractionId: attraction.id, // 🔁 Replace with real attraction ID
          vote: direction, // "like" or "dislike"
        }),
      });

      if (!res.ok) throw new Error("Failed to record vote");

      const data = await res.json();
      console.log("Vote saved:", data);

      setVotes((prev) => ({ ...prev, [attraction.id]: direction }));
      setIndex((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      alert("Something went wrong when voting.");
    }
  };

  if (index >= mockAttractions.length) {
    return (
      <div className="text-center text-xl p-4">You’ve voted on everything!</div>
    );
  }

  const current = mockAttractions[index];

  return (
    <div className="flex flex-col items-center p-4">
      {/* Attraction Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden mb-4">
        <img
          src={current.image}
          alt={current.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4 text-center text-xl font-semibold">
          {current.name}
        </div>
      </div>

      {/* Buttons or Swipe Prompt */}
      {!isMobile ? (
        <div className="flex gap-8">
          <button
            onClick={() => handleVote("dislike")}
            className="p-4 bg-red-100 hover:bg-red-200 rounded-full text-red-600"
          >
            <FaThumbsDown size={24} />
          </button>
          <button
            onClick={() => handleVote("like")}
            className="p-4 bg-green-100 hover:bg-green-200 rounded-full text-green-600"
          >
            <FaThumbsUp size={24} />
          </button>
        </div>
      ) : (
        <div className="text-sm text-gray-500">Swipe gestures coming soon</div>
      )}
    </div>
  );
};

export default SwipeView;
