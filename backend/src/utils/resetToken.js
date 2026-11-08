import crypto from "node:crypto";

const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};


export default generateResetToken;

