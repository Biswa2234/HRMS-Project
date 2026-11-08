import {
  getDashboardSummary,
  getDashboardTasks,
  getDashboardLeaves,
} from "../services/dashboard.service.js";

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
      Object.entries(value).map(([key, val]) => [
        key,
        serialize(val),
      ])
    );
  }

  return value;
};

const getSummary = async (req, res, next) => {
  try {
    const data = await getDashboardSummary(req.user);

    return res.status(200).json({
      success: true,
      message: "Dashboard summary fetched successfully",
      data: serialize(data),
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const data = await getDashboardTasks(req.user);

    return res.status(200).json({
      success: true,
      message: "Dashboard tasks fetched successfully",
      data: serialize(data),
    });
  } catch (error) {
    next(error);
  }
};

const getLeaves = async (req, res, next) => {
  try {
    const data = await getDashboardLeaves(req.user);

    return res.status(200).json({
      success: true,
      message: "Dashboard leaves fetched successfully",
      data: serialize(data),
    });
  } catch (error) {
    next(error);
  }
};

export {
  getSummary,
  getTasks,
  getLeaves,
};