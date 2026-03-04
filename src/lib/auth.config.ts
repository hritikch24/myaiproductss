import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        return { id: "1", email: credentials.email as string, name: "User" };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/legal-docs/login",
  },
  basePath: "/legal-docs/api/auth",
} satisfies NextAuthConfig;
