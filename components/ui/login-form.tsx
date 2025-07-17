"use client";

import { Alert, AlertDescription } from "./alert";

import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const loginSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async (values) => {
      setError(null);
      const { email, password } = values.value;
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      if (error) {
        setError(error.message ?? "An unknown error occurred");
        return;
      }
      if (data) {
        redirect(`/${data.user.id}`);
      }
    },
  });

  return (
    <div className="border rounded-lg p-4 w-full max-w-md bg-background">
      <div className="flex flex-col gap-4">
        <loginForm.Field
          name="email"
          validators={{
            onChange: loginSchema.shape.email,
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
              />
              {field.state.meta.errors.map((error, i) => (
                <Alert key={i} variant="destructive">
                  <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </loginForm.Field>
        <loginForm.Field
          name="password"
          validators={{
            onChange: loginSchema.shape.password,
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
              />
              {field.state.meta.errors.map((error, i) => (
                <Alert key={i} variant="destructive">
                  <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </loginForm.Field>
        <loginForm.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isDefaultValue,
          ]}
        >
          {([canSubmit, isSubmitting, isDefaultValue]) => (
            <Button
              onClick={() => loginForm.handleSubmit()}
              disabled={!canSubmit || isSubmitting || isDefaultValue}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          )}
        </loginForm.Subscribe>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <p className="text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
