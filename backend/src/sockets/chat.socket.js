import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

let io;

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
      const userId = decoded.userId ?? decoded.id;

      if (!userId) {
        return next(new Error("Invalid token payload"));
      }

      socket.data.userId = String(userId);
      socket.data.role = decoded.role;

      next();
    } catch {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    const room = `user:${socket.data.userId}`;

    socket.join(room);

    console.log(`Socket connected: ${room}`);

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${room}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO is not initialized");
  }

  return io;
};

export const emitToUser = (userId, event, payload) => {
  if (!io) {
    throw new Error("Socket.IO is not initialized");
  }

  io.to(`user:${String(userId)}`).emit(event, payload);
};