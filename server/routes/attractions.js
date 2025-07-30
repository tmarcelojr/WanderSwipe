import express from "express";
import {
  getAllAttractions,
  getAttractionById,
  swipeAttraction,
  getAttractionsByTrip,
} from "../controllers/attractionController.js";
import { protect } from "../middleware/requireAuth.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

/**
 * // @desc    Get all attractions
 * // @route   GET /api/attractions
 * // @access  Private
 */
router.get("/", getAllAttractions);

/**
 * // @desc    Get a single attraction by ID
 * // @route   GET /api/attractions/:id
 * // @access  Private
 */
router.get("/:id", getAttractionById);

/**
 * // @desc    Swipe (vote) on an attraction
 * // @route   POST /api/attractions/:id/swipe
 * // @access  Private
 */
router.post("/:id/swipe", swipeAttraction);

/**
 * // @desc    Get all attractions for a specific trip
 * // @route   GET /api/attractions/by-trip/:tripId
 * // @access  Private
 */
router.get("/by-trip/:tripId", getAttractionsByTrip);

export default router;
