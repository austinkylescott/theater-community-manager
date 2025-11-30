"use client";

import { useEffect, useState } from "react";
import { signInWithGitHub, signOut, useSession } from "@/lib/auth-client";
import { Button } from "../ui/button";

const AuthButtons = () => {
  const [mounted, setMounted] = useState(false);
  const mockDelayMs = Number(process.env.NEXT_PUBLIC_AUTH_BUTTON_DELAY_MS ?? 0);
  const { data } = useSession();
  const user = data?.user;
  const loggedIn = Boolean(user);

  useEffect(() => {
    if (mockDelayMs > 0) {
      const timer = setTimeout(() => setMounted(true), mockDelayMs);
      return () => clearTimeout(timer);
    }
    setMounted(true);
  }, [mockDelayMs]);

  const handleSignOut = () => {
    signOut().catch(() => undefined);
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden sm:block">
          <div className="bg-muted pointer-events-none inline-flex h-9 animate-pulse items-center rounded-md border px-4 text-transparent select-none">
            Sign up
          </div>
        </div>
        <div className="bg-muted pointer-events-none inline-flex h-9 animate-pulse items-center rounded-md px-4 text-transparent select-none">
          Login
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <p>{loggedIn ? `Hi, ${user?.name}` : null}</p>
      {loggedIn ? (
        <Button className="hidden sm:flex" variant="secondary">
          Invite
        </Button>
      ) : null}
      {!loggedIn ? (
        <Button asChild variant="outline" className="hidden sm:inline-flex">
          <a href="/signup">Sign up</a>
        </Button>
      ) : null}
      {loggedIn ? (
        <Button onClick={handleSignOut}>Logout</Button>
      ) : (
        <Button asChild>
          <a href="/login">Login</a>
        </Button>
      )}
    </div>
  );
};

export default AuthButtons;
