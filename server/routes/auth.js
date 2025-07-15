import express from "express";
import {
  login,
  register,
  getCurrentUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

// This route now requires a valid JWT
router.get("/me", protect, getCurrentUser);

export default router;
