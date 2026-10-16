import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: `"HRMS" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "HRMS - Password Reset",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>HRMS Password Reset</h2>

        <p>Hello,</p>

        <p>
          We received a request to reset your HRMS account password.
        </p>

        <p>
          Click the button below to reset your password:
        </p>

        <a
          href="${resetLink}"
          style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top: 20px;">
          This link will expire in <strong>15 minutes</strong>.
        </p>

        <p>
          If you did not request this password reset, please ignore this email.
        </p>

        <p>
          Regards,<br>
          HRMS Team
        </p>
      </div>
    `,
  });
};

export default {
  sendPasswordResetEmail,
};
