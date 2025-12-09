import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import TheaterCard, { TheaterCardContainer } from "@/components/TheaterCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTheatersForUser } from "@/lib/theaters";

async function createTheaterAction(formData: FormData) {
  "use server";
  const headersList = new Headers(await headers());
  const sessionResult = await auth.api.getSession({ headers: headersList });
  const user = sessionResult?.user;
  if (!user) {
    redirect("/login?reason=signin&callback=/theaters");
  }

  const name = formData.get("name");
  const theaterName = typeof name === "string" ? name.trim() : "";
  if (!theaterName) return;

  const theater = await prisma.theater.create({
    data: { name: theaterName },
  });

  await prisma.membership.upsert({
    where: {
      userId_theaterId: {
        userId: user.id,
        theaterId: theater.id,
      },
    },
    update: { role: Role.MANAGER },
    create: { userId: user.id, theaterId: theater.id, role: Role.MANAGER },
  });

  revalidatePath("/theaters");
}

async function joinTheaterAction(formData: FormData) {
  "use server";
  const headersList = new Headers(await headers());
  const sessionResult = await auth.api.getSession({ headers: headersList });
  const user = sessionResult?.user;
  if (!user) {
    redirect("/login?reason=signin&callback=/theaters");
  }

  const theaterId = formData.get("theaterId");
  const parsedTheaterId = typeof theaterId === "string" ? theaterId.trim() : "";
  if (!parsedTheaterId) return;

  await prisma.membership.upsert({
    where: {
      userId_theaterId: {
        userId: user.id,
        theaterId: parsedTheaterId,
      },
    },
    update: {},
    create: {
      userId: user.id,
      theaterId: parsedTheaterId,
      role: Role.PERFORMER,
    },
  });

  revalidatePath("/theaters");
}

export default async function Theaters() {
  const headersList = new Headers(await headers());
  const sessionResult = await auth.api.getSession({ headers: headersList });
  const user = sessionResult?.user;

  if (!user) {
    redirect("/login?reason=signin&callback=/theaters");
  }

  const theaters = await getTheatersForUser(user.id);
  const joinableTheaters = await prisma.theater.findMany({
    where: {
      memberships: {
        none: { userId: user.id },
      },
    },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create a new theater</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createTheaterAction} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="theater-name">Theater name</FieldLabel>
                  <Input
                    id="theater-name"
                    name="name"
                    type="text"
                    required
                    placeholder="My New Theater"
                  />
                </Field>
                <div className="flex justify-end">
                  <Button type="submit">Create &amp; become admin</Button>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Join an existing theater</CardTitle>
          </CardHeader>
          <CardContent>
            {joinableTheaters.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                You&apos;re already a member of every theater.
              </p>
            ) : (
              <form action={joinTheaterAction} className="space-y-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="join-theater">
                      Select theater
                    </FieldLabel>
                    <select
                      id="join-theater"
                      name="theaterId"
                      className="border-input focus-visible:ring-ring/50 focus-visible:border-ring w-full rounded-md border px-3 py-2 text-sm shadow-xs transition outline-none"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Choose a theater
                      </option>
                      {joinableTheaters.map((theater) => (
                        <option key={theater.id} value={theater.id}>
                          {theater.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <div className="flex justify-end">
                    <Button type="submit">Join theater</Button>
                  </div>
                </FieldGroup>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      <TheaterCardContainer>
        {theaters.length === 0 ? (
          <p className="text-muted-foreground">No theaters yet.</p>
        ) : (
          theaters.map((theater) => (
            <TheaterCard
              key={theater.id}
              name={theater.name}
              upcomingShows={theater.shows.map((show) => show.title)}
              showCount={theater._count.shows}
              memberCount={theater._count.memberships}
            />
          ))
        )}
      </TheaterCardContainer>
    </div>
  );
}
