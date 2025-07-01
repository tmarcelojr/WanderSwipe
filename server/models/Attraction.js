// models/Attraction.js
const mongoose = require("mongoose");

const AttractionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    votes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        vote: { type: String, enum: ["like", "dislike"] },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attraction", AttractionSchema);
