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
  ButtonGroupText,
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

const TheaterCard = () => {
  return (
    <Card>
      {/* Make the header a grid; 1 col on mobile, 2 on >=sm */}
      <CardHeader className="grid gap-2 sm:grid-cols-[1fr_auto]">
        {/* Title */}
        <CardTitle className="flex items-center gap-2 text-lg text-balance md:text-2xl">
          <Avatar>
            <AvatarImage
              alt="Theater avatar"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          The Focus Theater
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
        <CardDescription className="order-2 hidden flex-col gap-1 sm:col-span-2 sm:flex">
          <span>Rochester&apos;s Home for Improv Comedy</span>
        </CardDescription>

        {/* Address — span the full grid width */}
        <CardDescription className="order-4 col-span-full">
          <span className="flex flex-row items-center">
            <MapPin aria-hidden="true" className="mr-1 size-[1em] shrink-0" />
            <span>260 E. Main St. Rochester, NY 14604</span>
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>Upcoming Shows</p>
        <ul className="hidden sm:block">
          <li>Ants to Gods</li>
          <li>JFT & Friends</li>
          <li>Nerds in a Basement</li>
        </ul>
      </CardContent>

      <CardFooter>
        <p>See full schedule</p>
      </CardFooter>
    </Card>
  );
};

export default TheaterCard;
