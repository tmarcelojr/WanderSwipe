import express from "express";
import {
  createTrip,
  getUserTrips,
  getTripById,
  updateTripById,
  deleteTripById,
} from "../controllers/tripController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply protect to ALL routes after this line
router.use(protect);

// Protected trip routes
router.post("/create", createTrip);
router.get("/my-trips", getUserTrips);
router.get("/:id", getTripById);
router.put("/:id", updateTripById);
router.delete("/:id", deleteTripById);

export default router;
