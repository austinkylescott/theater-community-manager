/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const [manager, p1, p2, p3] = await Promise.all([
    prisma.user.upsert({
      where: { email: "manager@example.com" },
      update: {},
      create: { email: "manager@example.com", name: "Manager" },
    }),
    prisma.user.upsert({
      where: { email: "ali@example.com" },
      update: {},
      create: { email: "ali@example.com", name: "Ali" },
    }),
    prisma.user.upsert({
      where: { email: "ben@example.com" },
      update: {},
      create: { email: "ben@example.com", name: "Ben" },
    }),
    prisma.user.upsert({
      where: { email: "cam@example.com" },
      update: {},
      create: { email: "cam@example.com", name: "Cam" },
    }),
  ]);

  await Promise.all(
    [p1, p2, p3].map((u) =>
      prisma.performerProfile.upsert({
        where: { userId: u.id },
        update: {},
        create: { userId: u.id, displayName: u.name ?? "Performer" },
      }),
    ),
  );

  let theater = await prisma.theater.findFirst({
    where: { name: "Focus Theater" },
  });
  if (!theater) {
    theater = await prisma.theater.create({ data: { name: "Focus Theater" } });
  }

  await prisma.membership.createMany({
    data: [
      { userId: manager.id, theaterId: theater.id, role: "MANAGER" },
      { userId: p1.id, theaterId: theater.id, role: "PERFORMER" },
      { userId: p2.id, theaterId: theater.id, role: "PERFORMER" },
      { userId: p3.id, theaterId: theater.id, role: "PERFORMER" },
    ],
    skipDuplicates: true,
  });

  const show = await prisma.show.create({
    data: {
      theaterId: theater.id,
      title: "Friday Night Showcase",
      dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      venueName: "Main Stage",
    },
  });

  await prisma.lineupSlot.createMany({
    data: [
      { showId: show.id, order: 1, label: "Host", performerId: manager.id },
      { showId: show.id, order: 2, label: "Opener", performerId: p1.id },
      { showId: show.id, order: 3, label: "Team A" },
      { showId: show.id, order: 4, label: "Team B" },
      { showId: show.id, order: 5, label: "Closer", performerId: p2.id },
    ],
  });

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
