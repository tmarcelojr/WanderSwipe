import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favoriteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply protect to ALL routes after this line
router.use(protect);

// Protected favorite routes
router.post("/", addFavorite);
router.get("/", getFavorites);
router.delete("/:id", removeFavorite);

export default router;
