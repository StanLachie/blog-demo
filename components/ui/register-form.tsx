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

function RegisterForm() {
  const [error, setError] = useState<string | null>(null);

  const registerSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });

  const registerForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async (values) => {
      setError(null);
      const { name, email, password } = values.value;
      const { data, error } = await authClient.signUp.email({
        name,
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
        <registerForm.Field
          name="name"
          validators={{
            onChange: registerSchema.shape.name,
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
                onBlur={() => field.handleBlur()}
              />
              {field.state.meta.errors.map((error, i) => (
                <Alert key={i} variant="destructive">
                  <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </registerForm.Field>
        <registerForm.Field
          name="email"
          validators={{
            onChange: registerSchema.shape.email,
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
                onBlur={() => field.handleBlur()}
              />
              {field.state.meta.errors.map((error, i) => (
                <Alert key={i} variant="destructive">
                  <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </registerForm.Field>
        <registerForm.Field
          name="password"
          validators={{
            onChange: registerSchema.shape.password,
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
                onBlur={() => field.handleBlur()}
              />
              {field.state.meta.errors.map((error, i) => (
                <Alert key={i} variant="destructive">
                  <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </registerForm.Field>
        <registerForm.Field
          name="confirmPassword"
          validators={{
            onChange: ({ value, fieldApi }) =>
              value !== fieldApi.form.getFieldValue("password")
                ? "Passwords do not match"
                : undefined,
            onChangeListenTo: ["password"],
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
                onBlur={() => field.handleBlur()}
              />
              {field.state.meta.errors.map((error, i) => (
                <Alert key={i} variant="destructive">
                  <AlertDescription>
                    {typeof error === "string" ? error : error?.message}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </registerForm.Field>
        <registerForm.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isDefaultValue,
          ]}
        >
          {([canSubmit, isSubmitting, isDefaultValue]) => (
            <Button
              onClick={() => registerForm.handleSubmit()}
              disabled={!canSubmit || isSubmitting || isDefaultValue}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          )}
        </registerForm.Subscribe>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
