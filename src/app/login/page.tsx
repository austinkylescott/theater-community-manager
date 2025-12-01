import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

interface LoginPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: LoginPageProps) {
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
        <LoginForm callback={callback} />
      </div>
    </div>
  );
}
