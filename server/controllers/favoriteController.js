import Favorite from "../models/Favorite.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Get favorites (filter by userId and/or tripId)
// @route   GET /api/favorites
// @access  Private
export const getFavorites = asyncHandler(async (req, res) => {
  const { userId, tripId } = req.query;
  const query = {};

  if (userId) query.userId = userId;
  if (tripId) query.tripId = tripId;

  if (req.user !== userId) {
    res.status(403);
    throw new Error("Not authorized to view these favorites");
  }

  const favorites = await Favorite.find(query).sort({ createdAt: -1 });
  res.status(200).json(favorites);
});

// @desc    Add or update a favorite vote
// @route   POST /api/favorites
// @access  Private
export const addOrUpdateFavorite = asyncHandler(async (req, res) => {
  const { userId, tripId, attractionId, vote } = req.body;

  if (req.user !== userId) {
    res.status(403);
    throw new Error("Not authorized to modify this favorite");
  }

  const existing = await Favorite.findOne({ userId, tripId, attractionId });

  if (existing) {
    existing.vote = vote;
    const updated = await existing.save();
    return res.status(200).json(updated);
  }

  const favorite = new Favorite({ userId, tripId, attractionId, vote });
  const savedFavorite = await favorite.save();
  res.status(201).json(savedFavorite);
});

// @desc    Delete a favorite by ID
// @route   DELETE /api/favorites/:id
// @access  Private
export const deleteFavoriteById = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id);

  if (!favorite) {
    res.status(404);
    throw new Error("Favorite not found");
  }

  if (favorite.userId.toString() !== req.user) {
    res.status(403);
    throw new Error("Not authorized to delete this favorite");
  }

  await favorite.deleteOne();
  res.status(200).json({ message: "Favorite deleted successfully" });
});
