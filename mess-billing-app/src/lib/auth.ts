import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username as string;
        const password = credentials?.password as string;

        if (!username || !password) return null;

        // Admin login
        if (username === "admin") {
          if (password === process.env.ADMIN_PASSWORD) {
            return {
              id: "admin",
              name: "Admin",
              email: "admin@mess.iitrpr.ac.in",
              role: "admin",
            };
          }
          return null;
        }

        // Student login — username is entry number
        const student = await prisma.student.findUnique({
          where: { entryNo: username },
        });

        if (!student || !student.password) return null;

        const isValid = await bcrypt.compare(password, student.password);
        if (!isValid) return null;

        return {
          id: String(student.id),
          name: student.name,
          email: student.email || "",
          role: "student",
          entryNo: student.entryNo,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account }) {
      // For Google sign-in, verify student exists with matching email
      if (account?.provider === "google") {
        const student = await prisma.student.findUnique({
          where: { email: user.email! },
        });
        if (!student) {
          return false; // Reject sign-in if no student found
        }
        // Attach student info to user object
        (user as any).role = "student";
        (user as any).entryNo = student.entryNo;
        (user as any).id = String(student.id);
        (user as any).name = student.name;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.entryNo = (user as any).entryNo;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).entryNo = token.entryNo;
        (session.user as any).id = token.userId;
      }
      return session;
    },
  },
});
