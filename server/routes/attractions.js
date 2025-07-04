import express from "express";
import {
  getAllAttractions,
  getAttractionById,
  swipeAttraction,
} from "../controllers/attractionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply protect to ALL routes after this line
router.use(protect);

// Protected attraction routes
router.get("/", getAllAttractions);
router.get("/:id", getAttractionById);
router.post("/:id/swipe", swipeAttraction);

export default router;
