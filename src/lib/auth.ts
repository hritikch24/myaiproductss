import NextAuth from "next-auth";
import pool from "./db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;

      const { rows } = await pool.query(
        `INSERT INTO users (email, name, image, google_id)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO UPDATE SET
           name = EXCLUDED.name,
           image = EXCLUDED.image,
           google_id = COALESCE(users.google_id, EXCLUDED.google_id)
         RETURNING id`,
        [user.email, user.name, user.image, account.providerAccountId]
      );

      user.id = String(rows[0].id);
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
});
