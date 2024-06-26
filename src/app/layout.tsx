"use client";
import React, { useMemo } from "react";

import "./globals.css";
import AppWalletProvider from "@/components/AppWalletProvider";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session | null;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <AppWalletProvider>{children}</AppWalletProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
