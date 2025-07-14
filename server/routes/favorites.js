import express from "express";
import {
  getFavorites,
  addOrUpdateFavorite,
  deleteFavoriteById,
} from "../controllers/favoriteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply protect to ALL routes after this line
router.use(protect);

// Protected favorite routes
router.get("/", getFavorites);
router.post("/", addOrUpdateFavorite);
router.delete("/:id", deleteFavoriteById);

export default router;
