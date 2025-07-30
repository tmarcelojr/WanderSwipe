import asyncHandler from "../middleware/asyncHandler.js";
import Attraction from "../models/Attraction.js";

/**
 * // @desc    Get all attractions
 * // @route   GET /api/attractions
 * // @access  Private
 */
export const getAllAttractions = asyncHandler(async (req, res) => {
  const attractions = await Attraction.find().populate("trip");
  res.status(200).json(attractions);
});

/**
 * // @desc    Get a single attraction by ID
 * // @route   GET /api/attractions/:id
 * // @access  Private
 */
export const getAttractionById = asyncHandler(async (req, res) => {
  const attraction = await Attraction.findById(req.params.id).populate("trip");

  if (!attraction) {
    res.status(404);
    throw new Error("Attraction not found");
  }

  res.status(200).json(attraction);
});

/**
 * // @desc    Swipe (vote) on an attraction
 * // @route   POST /api/attractions/:id/swipe
 * // @access  Private
 */
export const swipeAttraction = asyncHandler(async (req, res) => {
  const { vote } = req.body; // 'like' or 'dislike'
  const userId = req.user._id;
  const attraction = await Attraction.findById(req.params.id);

  if (!attraction) {
    res.status(404);
    throw new Error("Attraction not found");
  }

  const existingVoteIndex = attraction.votes.findIndex(
    (v) => v.user.toString() === userId.toString()
  );

  if (existingVoteIndex > -1) {
    // Update existing vote
    attraction.votes[existingVoteIndex].vote = vote;
  } else {
    // Add new vote
    attraction.votes.push({ user: userId, vote });
  }

  await attraction.save();
  res.status(200).json({ message: `Vote '${vote}' recorded.` });
});

/**
 * // @desc    Get all attractions for a specific trip
 * // @route   GET /api/attractions/by-trip/:tripId
 * // @access  Private
 */
export const getAttractionsByTrip = asyncHandler(async (req, res) => {
  const { tripId } = req.params;
  const attractions = await Attraction.find({ trip: tripId });

  res.status(200).json(attractions);
});
