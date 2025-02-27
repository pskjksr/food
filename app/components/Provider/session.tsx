"use client";
import { type ReactNode } from "react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react"

interface SessionProps {
  session: Session | null;
  children: ReactNode;
}

export default function Session({ session, children }: SessionProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}