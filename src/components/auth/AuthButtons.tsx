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

  return (
    <div className="flex items-center gap-2">
      {mounted && loggedIn ? (
        <>
          <span className="text-muted-foreground hidden text-xs sm:inline">
            {userLabel}
            {user?.role ? ` (${user.role})` : ""}
          </span>
          {canInvite ? (
            <Button className="hidden sm:flex" variant="secondary">
              Invite
            </Button>
          ) : null}
          <Button onClick={handleSignOut}>Logout</Button>
        </>
      ) : null}
      {mounted && !loggedIn ? (
        <>
          <Button asChild variant="outline">
            <a href="/signup">Sign up</a>
          </Button>
          <Button asChild>
            <a href="/login">Log in</a>
          </Button>
        </>
      ) : null}
      {!mounted ? (
        <>
          <div className="bg-muted pointer-events-none inline-flex h-9 min-w-16 animate-pulse items-center rounded-md border px-4 text-transparent select-none" />
          <div className="bg-muted pointer-events-none inline-flex h-9 min-w-14 animate-pulse items-center rounded-md px-4 text-transparent select-none" />
        </>
      ) : null}
    </div>
  );
};

export default AuthButtons;
