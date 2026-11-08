import {
  createCheckIn,
  findAttendanceByUserAndDate,
  findAttendanceById,
  updateAttendance,
  findAttendanceRecords,
} from "../repositories/attendance.repository.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const ADMIN_ROLES = ["ADMIN", "HR"];

const getCurrentUserId = (currentUser) => {
  const id = currentUser?.userId ?? currentUser?.id;

  if (!id || !/^\d+$/.test(String(id)) || BigInt(id) <= 0n) {
    throw createError("Invalid authenticated user", 401);
  }

  return String(id);
};

const isAdminOrHR = (currentUser) => {
  return ADMIN_ROLES.includes(
    String(currentUser?.role ?? "").toUpperCase(),
  );
};

const parseDate = (dateString) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    throw createError("Date must use YYYY-MM-DD format", 400);
  }

  const date = new Date(`${dateString}T00:00:00.000Z`);

  if (
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== dateString
  ) {
    throw createError("Invalid date", 400);
  }

  return date;
};

// Use the server's local calendar date.
// Configure the server timezone consistently with the company timezone.
const getToday = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return parseDate(`${year}-${month}-${day}`);
};

const checkIn = async (currentUser, remarks) => {
  const userId = getCurrentUserId(currentUser);
  const attendanceDate = getToday();

  const existing = await findAttendanceByUserAndDate(
    userId,
    attendanceDate,
  );

  if (existing) {
    throw createError(
      "Attendance already exists for today",
      409,
    );
  }

  try {
    return await createCheckIn({
      userId: BigInt(userId),
      attendanceDate,
      checkIn: new Date(),
      status: "present",
      ...(remarks !== undefined ? { remarks } : {}),
    });
  } catch (error) {
    // The unique database constraint prevents concurrent duplicate check-ins.
    if (error.code === "P2002") {
      throw createError(
        "Attendance already exists for today",
        409,
      );
    }

    throw error;
  }
};

const checkOut = async (currentUser) => {
  const userId = getCurrentUserId(currentUser);
  const attendanceDate = getToday();

  const attendance = await findAttendanceByUserAndDate(
    userId,
    attendanceDate,
  );

  if (!attendance || !attendance.checkIn) {
    throw createError(
      "Please check in before checking out",
      400,
    );
  }

  if (attendance.checkOut) {
    throw createError(
      "You have already checked out today",
      409,
    );
  }

  const checkOutTime = new Date();

  if (checkOutTime <= attendance.checkIn) {
    throw createError(
      "Check-out must be after check-in",
      400,
    );
  }

  const workingMinutes = Math.floor(
    (checkOutTime.getTime() - attendance.checkIn.getTime()) /
      60000,
  );

  return updateAttendance(attendance.id, {
    checkOut: checkOutTime,
    workingMinutes,
  });
};

const getMyAttendance = async (currentUser, query) => {
  const userId = getCurrentUserId(currentUser);

  return getAttendanceRecords(
    {
      ...query,
      userId,
    },
    currentUser,
  );
};

const getAttendanceRecords = async (query, currentUser) => {
  const admin = isAdminOrHR(currentUser);

  let userId = query.userId;

  if (!admin) {
    userId = getCurrentUserId(currentUser);
  }

  if (userId !== undefined && userId !== null) {
    if (!/^\d+$/.test(String(userId)) || BigInt(userId) <= 0n) {
      throw createError("Invalid user ID", 400);
    }
  }

  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);

  const { records, total } = await findAttendanceRecords({
    userId,
    startDate: query.startDate,
    endDate: query.endDate,
    page,
    limit,
  });

  return {
    records,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getAttendanceById = async (id, currentUser) => {
  if (!/^\d+$/.test(String(id)) || BigInt(id) <= 0n) {
    throw createError("Invalid attendance ID", 400);
  }

  const attendance = await findAttendanceById(id);

  if (!attendance) {
    throw createError("Attendance record not found", 404);
  }

  const userId = getCurrentUserId(currentUser);

  if (
    !isAdminOrHR(currentUser) &&
    attendance.userId.toString() !== userId
  ) {
    throw createError("You cannot access this attendance", 403);
  }

  return attendance;
};

const updateAttendanceRecord = async (
  id,
  data,
  currentUser,
) => {
  if (!isAdminOrHR(currentUser)) {
    throw createError(
      "Only Admin or HR can update attendance records",
      403,
    );
  }

  if (!/^\d+$/.test(String(id)) || BigInt(id) <= 0n) {
    throw createError("Invalid attendance ID", 400);
  }

  const existing = await findAttendanceById(id);

  if (!existing) {
    throw createError("Attendance record not found", 404);
  }

  const updateData = {};

  if (data.status !== undefined) {
    updateData.status = data.status;
  }

  if (data.remarks !== undefined) {
    updateData.remarks = data.remarks;
  }

  return updateAttendance(id, updateData);
};

export {
  checkIn,
  checkOut,
  getMyAttendance,
  getAttendanceRecords,
  getAttendanceById,
  updateAttendanceRecord,
};