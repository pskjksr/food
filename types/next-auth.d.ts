import { type DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

// Extend the User type for the object returned by authorize
declare module "next-auth" {
  interface User {
    id: string; // NextAuth expects id as a string
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    name: string | null;
    phone: string | null;
    address: string | null;
    profileImage: string | null;
  }

  // Extend Session to include the custom User properties
  interface Session {
    user: {
      token: any;
      id: string; // NextAuth expects id as a string
      email: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
      name: string | null;
      phone: string | null;
      address: string | null;
      profileImage: string | null;
    };
  }
}

// Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string; // Added by NextAuth by default
    role: string;
    createdAt: Date;
    updatedAt: Date;
    name: string | null;
    phone: string | null;
    address: string | null;
    profileImage: string | null;
  }
}