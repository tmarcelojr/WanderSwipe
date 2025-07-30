import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";

/**
 * // @desc    Register a new user
 * // @route   POST /api/auth/register
 * // @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();

  const token = generateToken(newUser._id);

  res.status(201).json({
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

/**
 * // @desc    Authenticate user & get token
 * // @route   POST /api/auth/login
 * // @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

/**
 * // @desc    Get current logged-in user
 * // @route   GET /api/auth/me
 * // @access  Private
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
