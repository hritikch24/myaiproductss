import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Google,
    Credentials({
      name: "Email / Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // For demo: accept demo123 as password for any email
        if (credentials.password === "demo123") {
          return {
            id: "demo",
            email: credentials.email as string,
            name: (credentials.email as string).split("@")[0],
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/legal-docs/login",
  },
  trustHost: true,
} satisfies NextAuthConfig;
