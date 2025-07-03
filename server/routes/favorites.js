import express from "express";
import Favorite from "../models/Favorite.js";

const router = express.Router();

// POST /api/favorites
router.post("/", async (req, res) => {
  try {
    const { userId, tripId } = req.body;
    const favorite = await Favorite.create({ userId, tripId });
    res.status(201).json(favorite);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save favorite", error: err.message });
  }
});

export default router;
