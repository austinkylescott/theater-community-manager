"use client";

import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [magicLinkClient()],
});

export const useSession = () => authClient.useSession();

export const signInWithGitHub = async () => {
  try {
    await authClient.signIn.social({
      provider: "github",
    });
  } catch (error) {
    console.error("GitHub sign-in failed:", error);
    throw error;
  }
};

export const signInWithMagicLink = async (email: string) => {
  try {
    await authClient.signIn.magicLink({ email });
  } catch (error) {
    console.error("Magic link sign-in failed: ", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await authClient.signOut();
  } catch (error) {
    console.error("Sign-out failed:", error);
    throw error;
  }
};
