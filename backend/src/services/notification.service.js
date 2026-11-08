import {
  createNotification as createNotificationRepo,
  findNotifications,
  findNotificationById,
  markAsRead as markAsReadRepo,
  markAllAsRead as markAllAsReadRepo,
  deleteNotification as deleteNotificationRepo,
} from "../repositories/notification.repository.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getUserId = (currentUser) => {
  const userId = currentUser?.userId ?? currentUser?.id;

  if (!userId || !/^\d+$/.test(String(userId)) || BigInt(userId) <= 0n) {
    throw createError("Invalid authenticated user", 401);
  }

  return String(userId);
};

const validateId = (id) => {
  if (!/^\d+$/.test(String(id)) || BigInt(id) <= 0n) {
    throw createError("Invalid notification ID", 400);
  }

  return String(id);
};

const listNotifications = async (currentUser, query) => {
  const userId = getUserId(currentUser);
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);

  let isRead;

  if (query.isRead !== undefined) {
    if (!["true", "false"].includes(query.isRead)) {
      throw createError("isRead must be true or false", 400);
    }

    isRead = query.isRead === "true";
  }

  const result = await findNotifications(
    userId,
    page,
    limit,
    isRead,
  );

  return {
    ...result,
    pagination: {
      page,
      limit,
      total: result.total,
      totalPages: Math.ceil(result.total / limit),
    },
  };
};

const getNotification = async (id, currentUser) => {
  const notificationId = validateId(id);
  const userId = getUserId(currentUser);

  const notification = await findNotificationById(
    notificationId,
    userId,
  );

  if (!notification) {
    throw createError("Notification not found", 404);
  }

  return notification;
};

const markNotificationRead = async (id, currentUser) => {
  const notificationId = validateId(id);
  const userId = getUserId(currentUser);

  const notification = await findNotificationById(
    notificationId,
    userId,
  );

  if (!notification) {
    throw createError("Notification not found", 404);
  }

  if (notification.isRead) {
    return notification;
  }

  await markAsReadRepo(notificationId, userId);

  return getNotification(notificationId, currentUser);
};

const markAllNotificationsRead = async (currentUser) => {
  const userId = getUserId(currentUser);

  const result = await markAllAsReadRepo(userId);

  return {
    updatedCount: result.count,
  };
};

const removeNotification = async (id, currentUser) => {
  const notificationId = validateId(id);
  const userId = getUserId(currentUser);

  const result = await deleteNotificationRepo(
    notificationId,
    userId,
  );

  if (result.count === 0) {
    throw createError("Notification not found", 404);
  }

  return {
    deleted: true,
  };
};

// Internal service for trusted backend workflows.
// Do not expose arbitrary recipient IDs through a public endpoint.
const createUserNotification = async ({
  userId,
  title,
  message,
  type,
  entityType,
  entityId,
}) => {
  if (!userId || !/^\d+$/.test(String(userId)) || BigInt(userId) <= 0n) {
    throw createError("Invalid recipient user ID", 400);
  }

  if (typeof title !== "string" || !title.trim() || title.trim().length > 200) {
    throw createError("Title is required and must not exceed 200 characters", 400);
  }

  if (
    typeof message !== "string" ||
    !message.trim() ||
    message.trim().length > 1000
  ) {
    throw createError("Message is required and must not exceed 1000 characters", 400);
  }

  if (typeof type !== "string" || !type.trim() || type.trim().length > 50) {
    throw createError("A valid notification type is required", 400);
  }

  return createNotificationRepo({
    userId: BigInt(userId),
    title: title.trim(),
    message: message.trim(),
    type: type.trim(),
    ...(entityType ? { entityType } : {}),
    ...(entityId !== undefined && entityId !== null
      ? { entityId: BigInt(entityId) }
      : {}),
  });
};

export {
  listNotifications,
  getNotification,
  markNotificationRead,
  markAllNotificationsRead,
  removeNotification,
  createUserNotification,
};