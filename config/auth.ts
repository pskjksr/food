import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
  } from "next";
import { type NextAuthOptions, getServerSession } from "next-auth";
import type { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../utils/prismaClient"; // Prisma Client
import bcrypt from "bcrypt";

export const config : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Emial", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req){

                if (!credentials) {
                    throw new Error("No credentials provided")
                }

                const email:string = credentials.email || "";
                const password:string = credentials.password || "";

                // ค้นหาผู้ใช้จากฐานข้อมูล
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user) {
                    return null;
                }

                // ตรวจสอบรหัสผ่าน
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                }

                console.log("User", user);

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return {
                        id: user.id.toString(), // Matches User.id: string
                        email: user.email,
                        role: user.role.toString(), // Matches User.role: Role
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        name: user.name,
                        phone: user.phone,
                        address: user.address,
                        profileImage: user.profileImage
                      };    
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                // Transfer all user properties to the token
                token.id = user.id;
                token.role = user.role; // Keep as Role enum, no need for .toString()
                token.createdAt = user.createdAt;
                token.updatedAt = user.updatedAt;
                token.name = user.name;
                token.phone = user.phone;
                token.address = user.address;
                token.profileImage = user.profileImage;
            }
            return token;
        },
        session({ session, token }) {
            console.log("Session check", session.user);
            
            session.user.id = token.id;
            session.user.email = token.email as string; // email is added by default from authorize
            session.user.role = token.role.toString(); // Role enum is converted to string
            session.user.createdAt = token.createdAt;
            session.user.updatedAt = token.updatedAt;
            session.user.name = token.name;
            session.user.phone = token.phone;
            session.user.address = token.address;
            session.user.profileImage = token.profileImage;
            return session;
        }
    }
}

export function auth(
    ...args:
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
      | [NextApiRequest, NextApiResponse]
      | []
  ) {
    return getServerSession(...args, config);
  }