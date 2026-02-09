const express = require("express");
const cors = require("cors");
require("dotenv").config();

const postRoutes = require("./src/routes/postRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString()
  });
});

// API routes
app.use("/api/posts", postRoutes);

// Global error handler
app.use(errorHandler);

// IMPORTANT: Render requires using process.env.PORT
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

