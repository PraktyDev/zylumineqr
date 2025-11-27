import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import { getUserFromDb } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = z.object({
          email: z.email(),
          password: z.string().min(6)
        }).safeParse(credentials);

        if (!parsed.success) {
          throw new Error("Invalid email or password format");
        }

        const { email, password } = parsed.data;
        const admin = await getUserFromDb(email, password);

        if (!admin) {
          throw new Error("Invalid credentials");
        }

        return admin;
      }
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated
      return !!auth;
    },
  },
});
