import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getShowWithLineup } from "@/lib/shows";

type ShowPageProps = {
  params: Promise<{ showId: string }>;
};

export default async function ShowPage({ params }: ShowPageProps) {
  const { showId } = await params;
  const headersList = new Headers(await headers());
  const sessionResult = await auth.api.getSession({ headers: headersList });
  const user = sessionResult?.user;

  if (!user) {
    redirect(`/login?reason=signin&callback=/shows/${showId}`);
  }

  const show = await getShowWithLineup(showId);
  if (!show) {
    notFound();
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">
            <Link href="/shows" className="hover:text-primary">
              Shows
            </Link>{" "}
            / {show.theater.name}
          </p>
          <h1 className="text-3xl font-semibold">{show.title}</h1>
          <p className="text-muted-foreground">
            {formatter.format(show.dateTime)}
            {show.venueName ? ` · ${show.venueName}` : ""}
          </p>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="border-b px-4 py-3">
          <h2 className="text-lg font-medium">Lineup</h2>
        </div>
        <ul className="divide-y">
          {show.slots.length === 0 ? (
            <li className="text-muted-foreground px-4 py-3 text-sm">
              No lineup slots yet.
            </li>
          ) : (
            show.slots.map((slot) => (
              <li key={slot.id} className="px-4 py-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground font-mono text-xs">
                      #{slot.order}
                    </span>
                    <div>
                      <div className="font-medium">{slot.label}</div>
                      <div className="text-muted-foreground text-sm">
                        {slot.performer
                          ? slot.performer.performer?.displayName ||
                            slot.performer.name ||
                            slot.performer.email
                          : "Unassigned"}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
