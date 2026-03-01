import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// Edge-compatible auth config (no Node.js-only imports like `pg`)
// Used by middleware. Full config with DB callbacks is in auth.ts.
export default {
  providers: [Google],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
