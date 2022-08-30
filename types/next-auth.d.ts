import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
  interface JWT {
    _id: string;
    isAdmin: boolean;
  }
}
