import express from "express";
import { 
    createTrip, 
    getUserTrips, 
    getTripById, 
    updateTripById,
    deleteTripById
 } from "../controllers/tripController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect routes that need auth
router.get("/my-trips", protect, getUserTrips);
router.post("/create", protect, createTrip);
router.get("/:id", protect, getTripById);
router.put("/:id", protect, updateTripById);
router.delete("/:id", protect, deleteTripById);

export default router;
