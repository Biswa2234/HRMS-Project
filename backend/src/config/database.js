import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("✅ MySQL database connected");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

export {
  prisma,
  connectDatabase,
};

