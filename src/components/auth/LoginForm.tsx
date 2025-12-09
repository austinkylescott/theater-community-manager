"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmail, signInWithGitHub } from "@/lib/auth-client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormProps = React.ComponentProps<typeof Card> & {
  callback?: string | null;
  reason?: string | null;
};

export function LoginForm({ callback, reason, ...props }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackParam = callback ?? searchParams.get("callback");
  const redirectTarget = callbackParam || "/theaters";
  const signupHref = callback
    ? `/signup?callback=${encodeURIComponent(callback)}`
    : callbackParam
      ? `/signup?callback=${encodeURIComponent(callbackParam)}`
      : "/signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        email: flattened.email?.[0],
        password: flattened.password?.[0],
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await signInWithEmail(parsed.data);
      router.replace(redirectTarget);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGitHub = () => {
    signInWithGitHub({ callbackURL: redirectTarget }).catch(() => undefined);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldGroup>
            {error ? (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}
            {reason === "signin" ? (
              <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                Please log in to continue.
                {callback ? ` We’ll send you back to ${callback}.` : ""}
              </div>
            ) : null}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              {fieldErrors.email ? (
                <p className="text-sm text-red-600">{fieldErrors.email}</p>
              ) : null}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              {fieldErrors.password ? (
                <p className="text-sm text-red-600">{fieldErrors.password}</p>
              ) : null}
            </Field>
            <Field className="flex flex-col gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
              <Button variant="outline" type="button" onClick={handleGitHub}>
                Log in with GitHub
              </Button>
              <FieldDescription className="px-6 text-center">
                Need an account? <a href={signupHref}>Sign up</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
