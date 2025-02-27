import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../utils/prismaClient"; // Prisma Client

export const authOptions: NextAuthOptions = {
  // กำหนด Authentication Providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // ใช้ Prisma Adapter
  adapter: PrismaAdapter(prisma),

  // ใช้ JWT สำหรับ Session
  session: {
    strategy: "jwt",
  },

  // Callbacks สำหรับ JWT และ Session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },

  // อื่น ๆ ตามต้องการ
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
