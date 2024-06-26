import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        address: { label: "Address", type: "text" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { address: credentials.address },
        });

        if (user) {
          return { address: user.address };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.address = user.address;
      }
      return token;
    },
  },
});
