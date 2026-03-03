import NextAuth from "next-auth";
import pool from "./db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    ...(authConfig.providers as any),
    {
      id: "credentials",
      name: "Email / Password",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // For demo/beta, allow any email with password "demo123"
        // In production, you would hash and verify password
        if (password === "demo123") {
          // Check if user exists
          const { rows } = await pool.query(
            "SELECT id, email, name, image FROM users WHERE email = $1",
            [email]
          );

          if (rows.length > 0) {
            return {
              id: String(rows[0].id),
              email: rows[0].email,
              name: rows[0].name,
              image: rows[0].image,
            };
          }

          // Create new user for demo
          const { rows: newRows } = await pool.query(
            `INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, email, name`,
            [email, email.split("@")[0]]
          );

          // Track user login
          try {
            await pool.query(
              `INSERT INTO site_stats (stat_type, page_path) VALUES ('user_login', $1)`,
              [email]
            );
          } catch (e) {
            console.error("Failed to track login:", e);
          }

          return {
            id: String(newRows[0].id),
            email: newRows[0].email,
            name: newRows[0].name,
          };
        }

        return null;
      },
    },
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Handle credentials login (no account means credentials provider)
      if (!account) {
        user.id = user.id as string;
        
        // Track user login
        try {
          await pool.query(
            `INSERT INTO site_stats (stat_type, page_path) VALUES ('user_login', $1)`,
            [user.email]
          );
        } catch (e) {
          console.error("Failed to track login:", e);
        }
        
        return true;
      }

      // Handle Google login
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
      
      // Track user login
      try {
        await pool.query(
          `INSERT INTO site_stats (stat_type, page_path) VALUES ('user_login', $1)`,
          [user.email]
        );
      } catch (e) {
        console.error("Failed to track login:", e);
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
