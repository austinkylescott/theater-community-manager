import type { Metadata } from "next";
import { SignupForm } from "@/components/signup/SignupForm";

export const metadata: Metadata = {
  title: "Sign up",
};

interface SignupPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: SignupPageProps) {
  const callbackParam = searchParams?.callback;
  const callback =
    typeof callbackParam === "string"
      ? callbackParam
      : Array.isArray(callbackParam)
        ? callbackParam[0]
        : null;

  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm callback={callback} />
      </div>
    </div>
  );
}
