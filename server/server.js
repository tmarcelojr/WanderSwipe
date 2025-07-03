import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import tripRoutes from "./routes/trips.js";
import favoriteRoutes from "./routes/favorites.js";

dotenv.config();

const startServer = async () => {
  await connectDB(); // wait for DB to connect

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/__ping", (req, res) => res.send("✅ Server is alive"));
  app.get("/test-direct", (req, res) => res.send("🔥 Direct route working"));

  app.use("/api/auth", authRoutes);
  app.use("/api/trips", tripRoutes);
  app.use("/api/favorites", favoriteRoutes);

  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
