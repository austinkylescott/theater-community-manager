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
  return <div className="grid lg:grid-cols-2 gap-2">{children}</div>;
};

const TheaterCard = () => {
  return (
    <Card>
      <CardHeader className="justify-center ">
        <CardTitle className="flex items-center text-2xl md:text-3xl gap-2">
          <Avatar>
            <AvatarImage
              alt="Theater avatar"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          The Focus Theater
        </CardTitle>
        <CardDescription className="hidden sm:flex flex-col gap-1">
          <span>Rochester&apos;s Home for Improv Comedy</span>

          <span className="flex flex-row items-center">
            <MapPin aria-hidden="true" className="shrink-0 size-[1em] mr-1" />
            <span>260 E. Main St. Rochester, NY 14604</span>
          </span>
        </CardDescription>

        <CardAction>
          <ButtonGroup
            className="hidden sm:flex"
            aria-label="Follow or Join theater"
          >
            <Button variant={"outline"}>Follow</Button>
            <ButtonGroupSeparator />
            <Button>Join</Button>
          </ButtonGroup>
          <Button className="flex sm:hidden">Join</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Upcoming Shows</p>
        <ul>
          <li>Ants to Gods</li>
          <li>JFT & Friends</li>
          <li>Nerds in a Basement</li>
        </ul>
      </CardContent>
      <CardFooter>
        <p>Short Form Tag</p>
        <p>Long Form Tag</p>
        <p>Musical Tag</p>
      </CardFooter>
    </Card>
  );
};

export default TheaterCard;
