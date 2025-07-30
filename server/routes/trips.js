import express from "express";
import {
  createTrip,
  getUserTrips,
  getTripById,
  updateTripById,
  deleteTripById,
} from "../controllers/tripController.js";
import { protect } from "../middleware/requireAuth.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

/**
 * // @desc    Create a new trip
 * // @route   POST /api/trips/create
 * // @access  Private
 */
router.post("/create", createTrip);

/**
 * // @desc    Get all trips for the logged-in user
 * // @route   GET /api/trips/my-trips
 * // @access  Private
 */
router.get("/my-trips", getUserTrips);

/**
 * // @desc    Get a single trip by ID
 * // @route   GET /api/trips/:id
 * // @access  Private
 */
router.get("/:id", getTripById);

/**
 * // @desc    Update a trip by ID
 * // @route   PUT /api/trips/:id
 * // @access  Private
 */
router.put("/:id", updateTripById);

/**
 * // @desc    Delete a trip by ID
 * // @route   DELETE /api/trips/:id
 * // @access  Private
 */
router.delete("/:id", deleteTripById);

export default router;
