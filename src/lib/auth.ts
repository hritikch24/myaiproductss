import NextAuth from "next-auth";
import pool from "./db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
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
        
        // Track user login
        try {
          await pool.query(
            `INSERT INTO site_stats (stat_type, page_path) VALUES ('user_login', $1)`,
            [user.email]
          );
        } catch (e) {
          console.error("Failed to track login:", e);
        }
      }
      
      // For credentials, user is already validated
      if (account?.provider === "credentials" && user.email) {
        try {
          await pool.query(
            `INSERT INTO site_stats (stat_type, page_path) VALUES ('user_login', $1)`,
            [user.email]
          );
        } catch (e) {
          console.error("Failed to track login:", e);
        }
      }
      
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
