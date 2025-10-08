"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import AuthButtons from "./auth/AuthButtons";

type Route = {
  name: string;
  href: string;
};

const defaultRoutes: Route[] = [
  { name: "Home", href: "/" },
  { name: "Theaters", href: "/theaters" },
  { name: "Shows", href: "/shows" },
  { name: "Performers", href: "/performers" },
  { name: "Profile", href: "/profile" },
  // { name: "Home2", href: "/" },
  // { name: "Theaters2", href: "/theaters" },
  // { name: "Profile2", href: "/profile" },
];

interface NavbarProps {
  routes?: Route[];
}

export default function Navbar({ routes = defaultRoutes }: NavbarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Logo</span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {routes.map((route) => (
              <NavigationMenuItem key={`${route.name}-${route.href}`}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={route.href} passHref>
                    {route.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Spacer for desktop to keep nav centered */}
        {/* <div className="hidden w-[60px] md:block" /> */}

        {/* Mobile Navigation - Visible only on mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="flex">
            <AuthButtons />
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent aria-describedby="mobile navbar" side="bottom">
            <SheetHeader>
              <SheetTitle>
                <span className="text-xl font-bold">Logo</span>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navbar links
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={`${route.name}-${route.href}`}
                  href={route.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "hover:text-primary text-lg font-medium transition-colors",
                    "hover:bg-accent rounded-md px-2 py-1",
                  )}
                >
                  {route.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
