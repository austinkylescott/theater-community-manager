"use client";

import { signInWithGitHub, signOut, useSession } from "@/lib/auth-client";
import { Button } from "../ui/button";

const AuthButtons = () => {
  const { data } = useSession();
  const session = data?.session;
  const user = data?.user;
  const loggedIn = Boolean(user);

  const handleSignIn = () => {
    signIn().catch(() => undefined);
  };

  const handleSignOut = () => {
    signOut().catch(() => undefined);
  };

  return (
    <div className="flex items-center gap-2">
      <p>{loggedIn ? `Hi, ${user?.name}` : null}</p>
      {loggedIn ? (
        <Button className="hidden sm:flex" variant="secondary">
          Invite
        </Button>
      ) : null}
      <Button onClick={loggedIn ? handleSignOut : handleSignIn}>
        {loggedIn ? "Logout" : "Login"}
      </Button>
    </div>
  );
};

export default AuthButtons;
