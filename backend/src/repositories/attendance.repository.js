import { prisma } from "../config/database.js";

const createCheckIn = async (data) => {
  return prisma.attendance.create({
    data,
  });
};

const findAttendanceByUserAndDate = async (userId, attendanceDate) => {
  return prisma.attendance.findUnique({
    where: {
      userId_attendanceDate: {
        userId: BigInt(userId),
        attendanceDate,
      },
    },
  });
};

const findAttendanceById = async (id) => {
  return prisma.attendance.findUnique({
    where: {
      id: BigInt(id),
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          username: true,
        },
      },
    },
  });
};

const updateAttendance = async (id, data) => {
  return prisma.attendance.update({
    where: {
      id: BigInt(id),
    },
    data,
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
};

const findAttendanceRecords = async ({
  userId,
  startDate,
  endDate,
  page,
  limit,
}) => {
  const where = {};

  if (userId !== undefined && userId !== null) {
    where.userId = BigInt(userId);
  }

  if (startDate || endDate) {
    where.attendanceDate = {};

    if (startDate) {
      where.attendanceDate.gte = new Date(`${startDate}T00:00:00.000Z`);
    }

    if (endDate) {
      where.attendanceDate.lte = new Date(`${endDate}T00:00:00.000Z`);
    }
  }

  const [records, total] = await Promise.all([
    prisma.attendance.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        attendanceDate: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    }),

    prisma.attendance.count({ where }),
  ]);

  return {
    records,
    total,
  };
};

export {
  createCheckIn,
  findAttendanceByUserAndDate,
  findAttendanceById,
  updateAttendance,
  findAttendanceRecords,
};