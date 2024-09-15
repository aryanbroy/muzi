import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { prismaClient } from "@/app/lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  callbacks: {
    async signIn(params) {
      if (!params.user.email) {
        return false;
      }
      try {
        const existingUser = await prismaClient.user.findFirst({
          where: {
            email: params.user.email,
          },
        });

        if (existingUser) {
          params.user.id = existingUser.id;
          return true;
        }
        const newUser = await prismaClient.user.create({
          data: {
            email: params.user.email,
            provider: "Google",
          },
        });
        params.user.id = newUser.id;
        return true;
      } catch (error) {
        console.log(error);
        console.log("some error occured");
        return false;
      }
    },
    async jwt({ token, user }) {
      if (!user) {
        return token;
      }

      return {
        ...token,
        id: user.id,
      };
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
