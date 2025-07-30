import express from "express";
import {
  getFavorites,
  addOrUpdateFavorite,
  deleteFavoriteById,
} from "../controllers/favoriteController.js";
import { protect } from "../middleware/requireAuth.js";

const router = express.Router();

// Apply auth to all routes below
router.use(protect);

/**
 * // @desc    Get all favorites for the logged-in user
 * // @route   GET /api/favorites
 * // @access  Private
 */
router.get("/", getFavorites);

/**
 * // @desc    Add or update a favorite
 * // @route   POST /api/favorites
 * // @access  Private
 */
router.post("/", addOrUpdateFavorite);

/**
 * // @desc    Delete a favorite by ID
 * // @route   DELETE /api/favorites/:id
 * // @access  Private
 */
router.delete("/:id", deleteFavoriteById);

export default router;
