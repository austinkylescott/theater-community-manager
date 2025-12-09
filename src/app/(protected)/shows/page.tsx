import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getShowsForTheater } from "@/lib/shows";

export default async function Shows() {
  const headersList = new Headers(await headers());
  const sessionResult = await auth.api.getSession({ headers: headersList });
  const user = sessionResult?.user;

  if (!user) {
    redirect("/login?reason=signin&callback=/shows");
  }

  const theater = await prisma.theater.findFirst({
    where: { memberships: { some: { userId: user.id } } },
    orderBy: { name: "asc" },
  });

  if (!theater) {
    return <p className="text-muted-foreground">Join or create a theater.</p>;
  }

  const shows = await getShowsForTheater(theater.id);

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Shows at {theater.name}</h1>
      {shows.length === 0 ? (
        <p className="text-muted-foreground">No upcoming shows.</p>
      ) : (
        <ul className="divide-border divide-y rounded-md border">
          {shows.map((show) => (
            <li key={show.id} className="p-4">
              <Link
                href={`/shows/${show.id}`}
                className="hover:text-primary flex flex-col gap-1"
              >
                <span className="text-lg font-medium">{show.title}</span>
                <span className="text-muted-foreground text-sm">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(show.dateTime)}
                </span>
                <span className="text-muted-foreground text-sm">
                  {show._count.slots} lineup slot
                  {show._count.slots === 1 ? "" : "s"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
