const VALID_LEAVE_TYPES = [
  "casual",
  "sick",
  "earned",
  "unpaid",
];

const isValidDate = (value) => {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
};

const validateApplyLeave = (req, res, next) => {
  const {
    leaveType,
    startDate,
    endDate,
    reason,
  } = req.body;

  const errors = [];

  if (
    typeof leaveType !== "string" ||
    !VALID_LEAVE_TYPES.includes(leaveType)
  ) {
    errors.push(
      `leaveType must be one of: ${VALID_LEAVE_TYPES.join(", ")}`
    );
  }

  if (!isValidDate(startDate)) {
    errors.push("startDate must be a valid YYYY-MM-DD date");
  }

  if (!isValidDate(endDate)) {
    errors.push("endDate must be a valid YYYY-MM-DD date");
  }

  if (
    isValidDate(startDate) &&
    isValidDate(endDate) &&
    endDate < startDate
  ) {
    errors.push("endDate cannot be before startDate");
  }

  if (
    reason !== undefined &&
    reason !== null &&
    (
      typeof reason !== "string" ||
      reason.trim().length > 2000
    )
  ) {
    errors.push("reason must be a string of at most 2000 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

const validateLeaveDecision = (req, res, next) => {
  const { comments } = req.body;

  if (
    comments !== undefined &&
    (
      typeof comments !== "string" ||
      comments.length > 1000
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Comments must be a string of at most 1000 characters",
    });
  }

  next();
};

export {
  validateApplyLeave,
  validateLeaveDecision,
};