import { headers } from "next/headers";
import { redirect } from "next/navigation";
import TheaterCard, { TheaterCardContainer } from "@/components/TheaterCard";
import { auth } from "@/lib/auth";
import { getTheatersForUser } from "@/lib/theaters";

export default async function Theaters() {
  const headersList = new Headers(await headers());
  const sessionResult = await auth.api.getSession({ headers: headersList });
  const user = sessionResult?.user;

  if (!user) {
    redirect("/login?reason=signin&callback=/theaters");
  }

  const theaters = await getTheatersForUser(user.id);

  return (
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
  );
}
