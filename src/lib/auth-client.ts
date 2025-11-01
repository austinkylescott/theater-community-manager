"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const useSession = () => authClient.useSession();

export const signIn = async () => {
  try {
    await authClient.signIn.social({
      provider: "github",
    });
  } catch (error) {
    console.error("GitHub sign-in failed:", error);
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
