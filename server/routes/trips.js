import express from "express";
import { createTrip, getUserTrips } from "../controllers/tripController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect routes that need auth
router.get("/my-trips", protect, getUserTrips);
router.post("/create", protect, createTrip);

export default router;
