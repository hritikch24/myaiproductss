"use server";

import { signIn } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function loginWithCredentials(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/legal-docs/dashboard",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { error: "Invalid email or password" };
  }
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/legal-docs/dashboard" });
}
