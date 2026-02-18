import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import registerSocketHandlers from "../sockets/socketRegistry.js";

dotenv.config();

const app = express();

// -------------------
// Middleware
// -------------------
app.use(cors());
app.use(express.json());

// -------------------
// Health Check Route
// -------------------
app.get("/", (_req, res) => {
  res.json({ status: "Anime Draft Arena Server Running 🚀" });
});

// -------------------
// Create HTTP + Socket Server
// -------------------
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", // change later in production
  },
});

// -------------------
// Register Socket Handlers
// -------------------
registerSocketHandlers(io);

// -------------------
// Start Server
// -------------------
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
