import {
  checkIn as checkInService,
  checkOut as checkOutService,
  getMyAttendance as getMyAttendanceService,
  getAttendanceRecords as getAttendanceRecordsService,
  getAttendanceById as getAttendanceByIdService,
  updateAttendanceRecord as updateAttendanceRecordService,
} from "../services/attendance.service.js";

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
      ]),
    );
  }

  return value;
};

const checkIn = async (req, res, next) => {
  try {
    const data = await checkInService(
      req.user,
      req.body.remarks,
    );

    return res.status(201).json({
      success: true,
      message: "Checked in successfully",
      data: serialize(data),
    });
  } catch (error) {
    next(error);
  }
};

const checkOut = async (req, res, next) => {
  try {
    const data = await checkOutService(req.user);

    return res.status(200).json({
      success: true,
      message: "Checked out successfully",
      data: serialize(data),
    });
  } catch (error) {
    next(error);
  }
};

const getMyAttendance = async (req, res, next) => {
  try {
    const data = await getMyAttendanceService(
      req.user,
      req.query,
    );

    return res.status(200).json({
      success: true,
      message: "Attendance history fetched successfully",
      data: serialize(data),
    });
  } catch (error) {
    next(error);
  }
};

const getAttendanceRecords = async (req, res, next) => {
  try {
    const data = await getAttendanceRecordsService(
      req.query,
      req.user,
    );

    return res.status(200).json({
      success: true,
      message: "Attendance records fetched successfully",
      data: serialize(data),
    });
  } catch (error) {
    next(error);
  }
};

const getAttendanceById = async (req, res, next) => {
  try {
    const data = await getAttendanceByIdService(
      req.params.id,
      req.user,
    );

    return res.status(200).json({
      success: true,
      message: "Attendance record fetched successfully",
      data: serialize(data),
    });
  } catch (error) {
    next(error);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const data = await updateAttendanceRecordService(
      req.params.id,
      req.body,
      req.user,
    );

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: serialize(data),
    });
  } catch (error) {
    next(error);
  }
};

export {
  checkIn,
  checkOut,
  getMyAttendance,
  getAttendanceRecords,
  getAttendanceById,
  updateAttendance,
};