import express from "express";
import Vote from "../models/Vote.js";

const router = express.Router();

/**
 * // @desc    Submit a vote for an attraction in a trip
 * // @route   POST /api/votes
 * // @access  Public (can be protected later)
 */
router.post("/", async (req, res) => {
  const { userId, tripId, attractionId, vote } = req.body;

  if (
    !userId ||
    !tripId ||
    !attractionId ||
    !["like", "dislike"].includes(vote)
  ) {
    return res.status(400).json({ message: "Invalid vote payload" });
  }

  try {
    const updatedVote = await Vote.findOneAndUpdate(
      { userId, tripId, attractionId },
      { vote },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: "Vote recorded", vote: updatedVote });
  } catch (err) {
    console.error("Vote error:", err);
    res.status(500).json({ message: "Server error while recording vote" });
  }
});

export default router;
