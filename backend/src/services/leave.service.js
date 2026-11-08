import * as leaveRepository from "../repositories/leave.repository.js";
import { publishNotificationEvent } from "./notification-events.service.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const toBigInt = (value) => {
  if (!/^[1-9]\d*$/.test(String(value))) {
    throw createError("Invalid leave ID", 400);
  }

  return BigInt(value);
};

const isAdminOrHR = (user) =>
  ["ADMIN", "HR"].includes(
    String(user.role || "").toUpperCase()
  );

const applyLeave = async (input, currentUser) => {
  const startDate = new Date(
    `${input.startDate}T00:00:00.000Z`
  );

  const endDate = new Date(
    `${input.endDate}T00:00:00.000Z`
  );

  if (endDate < startDate) {
    throw createError(
      "End date cannot be before start date",
      400
    );
  }

const leave = await leaveRepository.createLeave({
  userId: toBigInt(currentUser.id),
  leaveType: input.leaveType,
  startDate,
  endDate,
  reason: input.reason?.trim() || null,
});

try {
  await publishNotificationEvent({
    type: "LEAVE_REQUESTED",
    userId: String(leave.userId),
    actorId: String(currentUser.id),
    entityType: "leave",
    entityId: String(leave.id),
    title: "Leave Request Submitted",
    message: "Your leave request has been submitted successfully.",
  });
} catch (error) {
  console.error("Failed to publish leave notification:", error);
}

return leave;
};

const getLeaves = async (query, currentUser) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number(query.limit) || 10)
  );

  const where = {};

  // Employees can only view their own leave requests.
  if (!isAdminOrHR(currentUser)) {
    where.userId = toBigInt(currentUser.id);
  }

  if (query.status) {
    if (
      !["pending", "approved", "rejected", "cancelled"].includes(
        query.status
      )
    ) {
      throw createError("Invalid leave status", 400);
    }

    where.status = query.status;
  }

  const [leaves, total] = await Promise.all([
    leaveRepository.findLeaves(
      where,
      (page - 1) * limit,
      limit
    ),
    leaveRepository.countLeaves(where),
  ]);

  return {
    leaves,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getLeaveById = async (id, currentUser) => {
  const leave = await leaveRepository.findLeaveById(
    toBigInt(id)
  );

  if (!leave) {
    throw createError("Leave request not found", 404);
  }

  if (
    !isAdminOrHR(currentUser) &&
    leave.userId !== toBigInt(currentUser.id)
  ) {
    throw createError("You cannot access this leave request", 403);
  }

  return leave;
};

const cancelLeave = async (id, currentUser) => {
  const leave = await leaveRepository.findLeaveById(
    toBigInt(id)
  );

  if (!leave) {
    throw createError("Leave request not found", 404);
  }

  if (leave.userId !== toBigInt(currentUser.id)) {
    throw createError(
      "You can only cancel your own leave requests",
      403
    );
  }

  if (leave.status !== "pending") {
    throw createError(
      "Only pending leave requests can be cancelled",
      409
    );
  }

  return leaveRepository.updateLeave(leave.id, {
    status: "cancelled",
  });
};

const reviewLeave = async (
  id,
  decision,
  currentUser,
  comments
) => {
  if (!isAdminOrHR(currentUser)) {
    throw createError(
      "Only HR or Admin can review leave requests",
      403
    );
  }

  const leaveId = toBigInt(id);

  const leave = await leaveRepository.findLeaveById(leaveId);

  if (!leave) {
    throw createError("Leave request not found", 404);
  }

  if (leave.status !== "pending") {
    throw createError(
      "Only pending leave requests can be reviewed",
      409
    );
  }

const updatedLeave = await leaveRepository.updateLeave(leaveId, {
  status: decision,
  reviewedById: toBigInt(currentUser.id),
  reviewedAt: new Date(),
  ...(comments !== undefined
    ? {
        reason: leave.reason
          ? `${leave.reason}\nReview: ${comments}`
          : `Review: ${comments}`,
      }
    : {}),
});

try {
  await publishNotificationEvent({
    type: decision === "approved"
      ? "LEAVE_APPROVED"
      : "LEAVE_REJECTED",
    userId: String(updatedLeave.userId),
    actorId: String(currentUser.id),
    entityType: "leave",
    entityId: String(updatedLeave.id),
    title: decision === "approved"
      ? "Leave Approved"
      : "Leave Rejected",
    message: `Your leave request has been ${decision}.`,
  });
} catch (error) {
  console.error("Failed to publish leave notification:", error);
}

return updatedLeave;
};

export {
  applyLeave,
  getLeaves,
  getLeaveById,
  cancelLeave,
  reviewLeave,
};