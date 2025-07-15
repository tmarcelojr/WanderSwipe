import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import tripRoutes from "./routes/trips.js";
import favoriteRoutes from "./routes/favorites.js";
import voteRoutes from "./routes/votes.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/__ping", (req, res) => res.send("Server is alive"));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/votes", voteRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5050;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
