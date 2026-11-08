const validateCheckIn = (req, res, next) => {
  const { remarks } = req.body;

  if (
    remarks !== undefined &&
    (typeof remarks !== "string" || remarks.trim().length > 500)
  ) {
    return res.status(400).json({
      success: false,
      message: "Remarks must not exceed 500 characters",
    });
  }

  if (typeof remarks === "string") {
    req.body.remarks = remarks.trim();
  }

  next();
};

const validateAttendanceQuery = (req, res, next) => {
  const { page = "1", limit = "10", startDate, endDate } = req.query;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    return res.status(400).json({
      success: false,
      message: "Page must be a positive integer",
    });
  }

  if (
    !Number.isInteger(parsedLimit) ||
    parsedLimit < 1 ||
    parsedLimit > 100
  ) {
    return res.status(400).json({
      success: false,
      message: "Limit must be between 1 and 100",
    });
  }

  const isValidDate = (value) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) &&
    new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;

  if (startDate && !isValidDate(startDate)) {
    return res.status(400).json({
      success: false,
      message: "startDate must use YYYY-MM-DD format",
    });
  }

  if (endDate && !isValidDate(endDate)) {
    return res.status(400).json({
      success: false,
      message: "endDate must use YYYY-MM-DD format",
    });
  }

  if (startDate && endDate && startDate > endDate) {
    return res.status(400).json({
      success: false,
      message: "startDate cannot be after endDate",
    });
  }

  next();
};

const validateAttendanceUpdate = (req, res, next) => {
  const { status, remarks } = req.body;

  const allowedStatuses = [
    "present",
    "absent",
    "half_day",
    "on_leave",
  ];

  if (status === undefined && remarks === undefined) {
    return res.status(400).json({
      success: false,
      message: "Provide status or remarks to update",
    });
  }

  if (status !== undefined && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid attendance status",
    });
  }

  if (
    remarks !== undefined &&
    remarks !== null &&
    (typeof remarks !== "string" || remarks.trim().length > 500)
  ) {
    return res.status(400).json({
      success: false,
      message: "Remarks must not exceed 500 characters",
    });
  }

  if (typeof remarks === "string") {
    req.body.remarks = remarks.trim();
  }

  next();
};

export {
  validateCheckIn,
  validateAttendanceQuery,
  validateAttendanceUpdate,
};