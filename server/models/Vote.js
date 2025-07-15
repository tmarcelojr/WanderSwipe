import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Trip",
    },
    attractionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Attraction",
    },
    vote: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure each user can vote only once per attraction per trip
voteSchema.index({ userId: 1, tripId: 1, attractionId: 1 }, { unique: true });

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
