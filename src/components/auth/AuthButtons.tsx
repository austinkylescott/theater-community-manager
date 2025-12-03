"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { hasRole } from "@/lib/auth-helpers";
import { useSessionContext } from "./session-context";
import { Button } from "../ui/button";

const AuthButtons = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { user } = useSessionContext();
  const loggedIn = Boolean(user);
  const userLabel = user?.name || user?.email;
  const canInvite = hasRole(user, ["MANAGER", "PRODUCER"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/");
      router.refresh();
    } catch {
      // swallow errors here; button will remain visible for another attempt
    }
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
      {loggedIn ? (
        <span className="text-muted-foreground hidden text-xs sm:inline">
          Signed in as {userLabel}
          {user?.role ? ` (${user.role})` : ""}
        </span>
      ) : null}
      {loggedIn && canInvite ? (
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
