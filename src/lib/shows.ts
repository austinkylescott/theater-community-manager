import { prisma } from "@/lib/prisma";

export async function getShowsForTheater(theaterId: string) {
  if (!theaterId) return [];

  const now = new Date();
  return prisma.show.findMany({
    where: {
      theaterId,
      dateTime: { gte: now },
    },
    orderBy: { dateTime: "asc" },
    include: {
      theater: { select: { id: true, name: true } },
      _count: { select: { slots: true } },
    },
  });
}

export async function getShowWithLineup(showId: string) {
  if (!showId) return null;

  return prisma.show.findUnique({
    where: { id: showId },
    include: {
      theater: true,
      slots: {
        orderBy: { order: "asc" },
        include: {
          performer: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              performer: {
                select: { displayName: true },
              },
            },
          },
        },
      },
    },
  });
}
