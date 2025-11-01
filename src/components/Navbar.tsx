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

type Route = { name: string; href: string };

const defaultRoutes: Route[] = [
  { name: "Home", href: "/" },
  { name: "Theaters", href: "/theaters" },
  { name: "Shows", href: "/shows" },
  { name: "Performers", href: "/performers" },
  { name: "My Profile", href: "/profile" },
];

interface NavbarProps {
  routes?: Route[];
}

export default function Navbar({ routes = defaultRoutes }: NavbarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="site-shell flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Logo</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {routes.map((route) => (
              <NavigationMenuItem key={`${route.name}-${route.href}`}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={route.href}>{route.name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right-side actions */}
        <div className="flex items-center gap-1">
          <AuthButtons />
          {/* Mobile trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            {/* Make the sheet full-bleed; we add our own inner padding */}
            <SheetContent
              aria-describedby="mobile navbar"
              side="bottom"
              className="p-0"
            >
              <SheetHeader className="px-4 pt-4">
                <SheetTitle>
                  <span className="text-xl font-bold">Logo</span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navbar links
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-4 pt-2 pb-6">
                {routes.map((route) => (
                  <Link
                    key={`${route.name}-${route.href}`}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-lg font-medium transition-colors",
                      "hover:bg-accent hover:text-primary",
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
