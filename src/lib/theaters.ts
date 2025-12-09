import { prisma } from "@/lib/prisma";

export async function getTheatersForUser(userId: string) {
  if (!userId) return [];

  const now = new Date();
  return prisma.theater.findMany({
    where: {
      memberships: { some: { userId } },
    },
    include: {
      _count: {
        select: { shows: true, memberships: true },
      },
      shows: {
        where: { dateTime: { gte: now } },
        orderBy: { dateTime: "asc" },
        select: { id: true, title: true, dateTime: true },
        take: 3,
      },
    },
    orderBy: { name: "asc" },
  });
}
