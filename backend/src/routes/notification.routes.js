import { Router } from "express";

import {
  getNotifications,
  getNotificationById,
  markNotificationAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

import {
  validateNotificationQuery,
} from "../validators/notification.validator.js";

const router = Router();

router.use(authenticateToken);

router.get("/", validateNotificationQuery, getNotifications);
router.get("/unread-count", validateNotificationQuery, getNotifications);
router.patch("/read-all", markAllAsRead);
router.patch("/:id/read", markNotificationAsRead);
router.get("/:id", getNotificationById);
router.delete("/:id", deleteNotification);

export default router;