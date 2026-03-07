import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import pool from "./padhai-db";
import bcrypt from "bcryptjs";

async function getUserFromDb(email: string, password: string) {
  const { rows } = await pool.query(
    "SELECT id, email, name, image, password_hash FROM users WHERE email = $1",
    [email.toLowerCase().trim()]
  );

  if (rows.length === 0) return null;

  const user = rows[0];

  if (!user.password_hash) return null;

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return null;

  return {
    id: String(user.id),
    email: user.email,
    name: user.name,
    image: user.image,
  };
}

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
        const user = await getUserFromDb(
          credentials.email as string,
          credentials.password as string
        );
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/padhai/login",
  },
  trustHost: true,
} satisfies NextAuthConfig;
