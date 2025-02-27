import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {config} from "@/config/auth"; // Prisma Client

const handler = NextAuth(config);

export { handler as GET, handler as POST };