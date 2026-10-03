import express from "express";
import prisma from "../config/database.js";
import asyncHandler from "./asyncHandler.js";

const app = express();

/**
 * Global Middleware
 */
app.use(express.json());

/**
 * Root
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HRMS Backend is running 🚀",
  });
});

/**
 * Application Health
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HRMS Backend is healthy ✅",
  });
});

/**
 * Database Health
 */
app.get(
  "/health/db",
  asyncHandler(async (req, res) => {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Database connected 🤖",
    });
  })
);

/**
 * 404 - Route Not Found
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // Prisma: Record not found
  if (err.code === "P2025") {
    statusCode = 404;
    message = "Requested record not found";
  }

  // Prisma: Unique constraint violation
  if (err.code === "P2002") {
    statusCode = 409;
    message = "A record with this value already exists";
  }

  // Prisma: Foreign key constraint violation
  if (err.code === "P2003") {
    statusCode = 400;
    message = "Invalid foreign key reference";
  }

  // Hide unexpected errors in production
  if (process.env.NODE_ENV === "production" && !err.isOperational) {
    message = "Internal server error";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
});

export default app;