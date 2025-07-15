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

// Get attractions for a trip
router.get('/:tripId/attractions', async (req, res) => {
  const { tripId } = req.params;
  // TODO: Fetch attractions from DB
  res.json([
    { id: '1', name: 'Statue of Liberty', image: '/images/statue.jpg' },
    { id: '2', name: 'Central Park', image: '/images/central-park.jpg' },
    { id: '3', name: 'Times Square', image: '/images/times-square.jpg' },
  ]);
});

export default router;
