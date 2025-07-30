import express from "express";
import {
  login,
  register,
  getCurrentUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/requireAuth.js";

const router = express.Router();

/**
 * // @desc    Register a new user
 * // @route   POST /api/auth/register
 * // @access  Public
 */
router.post("/register", register);

/**
 * // @desc    Login and retrieve JWT
 * // @route   POST /api/auth/login
 * // @access  Public
 */
router.post("/login", login);

/**
 * // @desc    Get currently logged-in user
 * // @route   GET /api/auth/me
 * // @access  Private
 */
router.get("/me", protect, getCurrentUser);

export default router;
