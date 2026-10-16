const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateRegister = (req, res, next) => {
  const { username, firstName, lastName, email, password } = req.body;

  if (
    !username ||
    !firstName ||
    !lastName ||
    !email ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Username, first name, last name, email and password are required",
    });
  }

  if (
    typeof username !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields must have valid string values",
    });
  }

  if (
    !username.trim() ||
    !firstName.trim() ||
    !lastName.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Name fields cannot be empty",
    });
  }

  if (!isValidEmail(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: "Valid email and password are required",
    });
  }

  if (!isValidEmail(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  next();
};

const validateForgotPassword = (req, res, next) => {
  const { email } = req.body;

  if (typeof email !== "string" || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!isValidEmail(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  next();
};

const validateResetPassword = (req, res, next) => {
  const { token, password } = req.body;

  if (
    typeof token !== "string" ||
    !token.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: "Reset token and new password are required",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  next();
};

export {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
};
