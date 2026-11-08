import * as leaveService from "../services/leave.service.js";

const serialize = (value) => {
  if (typeof value === "bigint") {
    return value.toString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(serialize);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        serialize(item),
      ])
    );
  }

  return value;
};

const applyLeave = async (req, res, next) => {
  try {
    const leave = await leaveService.applyLeave(
      req.body,
      req.user
    );

    return res.status(201).json({
      success: true,
      message: "Leave request submitted successfully",
      data: serialize(leave),
    });
  } catch (error) {
    next(error);
  }
};

const getLeaves = async (req, res, next) => {
  try {
    const result = await leaveService.getLeaves(
      req.query,
      req.user
    );

    return res.status(200).json({
      success: true,
      data: serialize(result),
    });
  } catch (error) {
    next(error);
  }
};

const getLeaveById = async (req, res, next) => {
  try {
    const leave = await leaveService.getLeaveById(
      req.params.id,
      req.user
    );

    return res.status(200).json({
      success: true,
      data: serialize(leave),
    });
  } catch (error) {
    next(error);
  }
};

const cancelLeave = async (req, res, next) => {
  try {
    const leave = await leaveService.cancelLeave(
      req.params.id,
      req.user
    );

    return res.status(200).json({
      success: true,
      message: "Leave request cancelled successfully",
      data: serialize(leave),
    });
  } catch (error) {
    next(error);
  }
};

const approveLeave = async (req, res, next) => {
  try {
    const leave = await leaveService.reviewLeave(
      req.params.id,
      "approved",
      req.user,
      req.body.comments
    );

    return res.status(200).json({
      success: true,
      message: "Leave request approved successfully",
      data: serialize(leave),
    });
  } catch (error) {
    next(error);
  }
};

const rejectLeave = async (req, res, next) => {
  try {
    const leave = await leaveService.reviewLeave(
      req.params.id,
      "rejected",
      req.user,
      req.body.comments
    );

    return res.status(200).json({
      success: true,
      message: "Leave request rejected successfully",
      data: serialize(leave),
    });
  } catch (error) {
    next(error);
  }
};

export {
  applyLeave,
  getLeaves,
  getLeaveById,
  cancelLeave,
  approveLeave,
  rejectLeave,
};