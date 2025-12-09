import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";

export const TheaterCardContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="my-4 grid gap-4 lg:grid-cols-2">{children}</div>;
};

type TheaterCardProps = {
  name: string;
  tagline?: string | null;
  address?: string | null;
  upcomingShows?: string[];
  showCount?: number;
  memberCount?: number;
};

const TheaterCard = ({
  name,
  tagline,
  address,
  upcomingShows = [],
  showCount,
  memberCount,
}: TheaterCardProps) => {
  const initials = name
    .split(" ")
    .map((part) => part.at(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card>
      {/* Make the header a grid; 1 col on mobile, 2 on >=sm */}
      <CardHeader className="grid gap-2 sm:grid-cols-[1fr_auto]">
        {/* Title */}
        <CardTitle className="flex items-center gap-2 text-lg text-balance md:text-2xl">
          <Avatar>
            <AvatarImage alt={`${name} avatar`} />
            <AvatarFallback>{initials || "TH"}</AvatarFallback>
          </Avatar>
          {name}
        </CardTitle>

        {/* Actions (at right on >=sm) */}
        <CardAction className="order-3 sm:order-2 sm:justify-self-end">
          <ButtonGroup
            className="hidden sm:flex"
            aria-label="Follow or Join theater"
          >
            <Button variant="outline">Follow</Button>
            <ButtonGroupSeparator />
            <Button>Join</Button>
          </ButtonGroup>
          <Button className="flex sm:hidden">Join</Button>
        </CardAction>

        {/* Tagline */}
        {tagline ? (
          <CardDescription className="order-2 hidden flex-col gap-1 sm:col-span-2 sm:flex">
            <span>{tagline}</span>
          </CardDescription>
        ) : null}

        {/* Address — span the full grid width */}
        {address ? (
          <CardDescription className="order-4 col-span-full">
            <span className="flex flex-row items-center">
              <MapPin aria-hidden="true" className="mr-1 size-[1em] shrink-0" />
              <span>{address}</span>
            </span>
          </CardDescription>
        ) : null}
      </CardHeader>

      <CardContent>
        <div className="text-muted-foreground flex flex-wrap gap-3 text-sm">
          {typeof showCount === "number" ? (
            <span>
              {showCount} upcoming show{showCount === 1 ? "" : "s"}
            </span>
          ) : null}
          {typeof memberCount === "number" ? (
            <span>
              {memberCount} member{memberCount === 1 ? "" : "s"}
            </span>
          ) : null}
        </div>
        {upcomingShows.length ? (
          <div className="mt-3">
            <p className="font-medium">Upcoming Shows</p>
            <ul className="hidden list-disc space-y-1 pl-5 sm:block">
              {upcomingShows.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>

      <CardFooter>
        <p>See full schedule</p>
      </CardFooter>
    </Card>
  );
};

export default TheaterCard;
