import express from "express";
import cors from "cors";

import { prisma } from "./config/database.js";
import asyncHandler from "./utils/asyncHandler.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import notificationRoutes from "./routes/notification.routes.js";
const app = express();

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * =========================
 * CORS
 * =========================
 */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/**
 * =========================
 * Global Middleware
 * =========================
 */
app.use(express.json());

/**
 * =========================
 * Auth Routes
 * =========================
 */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/notifications", notificationRoutes);
/**
 * =========================
 * Root
 * =========================
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HRMS Backend is running 🚀",
  });
});

/**
 * =========================
 * Application Health
 * =========================
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HRMS Backend is healthy ✅",
  });
});

/**
 * =========================
 * Database Health
 * =========================
 */
app.get(
  "/health/db",
  asyncHandler(async (req, res) => {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Database connected 🤖",
    });
  }),
);

/**
 * =========================
 * 404 - Route Not Found
 * =========================
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/**
 * =========================
 * Global Error Handler
 * =========================
 */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  if (err.code === "P2025") {
    statusCode = 404;
    message = "Requested record not found";
  }

  if (err.code === "P2002") {
    statusCode = 409;
    message = "A record with this value already exists";
  }

  if (err.code === "P2003") {
    statusCode = 400;
    message = "Invalid foreign key reference";
  }

  if (process.env.NODE_ENV === "production" && !err.isOperational) {
    message = "Internal server error";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
});

export default app;
