"use client";

import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const getAuthError = (result: unknown) => {
  if (result && typeof result === "object" && "error" in result) {
    const error = (result as { error?: { message?: string } }).error;
    return error?.message;
  }
  return undefined;
};

export const authClient = createAuthClient({
  plugins: [magicLinkClient()],
});

export const useSession = () => authClient.useSession();

export const signInWithGitHub = async (options?: { callbackURL?: string }) => {
  try {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: options?.callbackURL,
    });
  } catch (error) {
    console.error("GitHub sign-in failed:", error);
    throw error;
  }
};

export const signInWithMagicLink = async (email: string) => {
  try {
    const result = await authClient.signIn.magicLink({ email });
    const errorMessage = getAuthError(result);
    if (errorMessage) {
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Magic link sign-in failed: ", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const result = await authClient.signOut();
    const errorMessage = getAuthError(result);
    if (errorMessage) {
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Sign-out failed:", error);
    throw error;
  }
};

export const signUpWithEmail = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const result = await authClient.signUp.email(data);
    const errorMessage = getAuthError(result);
    if (errorMessage) {
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Email sign-up failed:", error);
    throw error;
  }
};

export const signInWithEmail = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const result = await authClient.signIn.email(data);
    const errorMessage = getAuthError(result);
    if (errorMessage) {
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Email sign-in failed:", error);
    throw error;
  }
};
