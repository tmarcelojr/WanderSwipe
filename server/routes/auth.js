import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.get("/test", (req, res) => res.send("🔥 Auth route test"));
router.post("/register", register);
router.post("/login", login);

export default router;
