"use server";

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginWithCredentials(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Try to sign in - if credentials are invalid, NextAuth will throw/redirect to error
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/legal-docs/dashboard",
  });
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/legal-docs/dashboard" });
}
