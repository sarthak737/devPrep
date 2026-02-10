"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(10, "Username must be at most 10 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ),
  email: z.email(),
  password: z.string().min(6),
});

export function AuthForm({ type }: { type: FormType }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (type == "sign-in") {
        toast.success("Logged In");
        console.log("Sign-in", data);
        router.push("/");
      } else {
        toast.success("Account created successfully");
        console.log("Sign-up", data);
        router.push("/sign-in");
      }
    } catch (err) {
      console.log("Error", err);
    }
  }

  const isSignIn = type == "sign-in";
  return (
    <Card className="lg:min-w-141.5">
      <div className="flex flex-col gap-3 py-8 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={32} height={38} />
          <h2 className="text-primary-100">DevPrep</h2>
        </div>
        <h3 className="text-center">Practice Interviews with AI</h3>
      </div>
      <CardContent>
        <form
          className="w-full space-y-5"
          id="form-rhf-input"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            {!isSignIn && (
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your username"
                      autoComplete="username"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="password"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="mt-2">
        <Field>
          <Button className="cursor-pointer" type="submit" form="form-rhf-input">
            {isSignIn ? "Submit" : "Create Account"}
          </Button>
          <p className="mt-1 font-light text-primary opacity-80 text-md">
            {isSignIn ? "No account? " : "Already have an account? "}
            <Link
              className="font-semibold underline"
              href={isSignIn ? "/sign-up" : "sign-in"}
            >
              {isSignIn ? "Create Account" : "Log In"}
            </Link>
          </p>
        </Field>
      </CardFooter>
    </Card>
  );
}
export default AuthForm;
