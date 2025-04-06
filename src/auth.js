import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectDB } from "../lib/db";
import User from "../models/User";

// Force Node.js runtime
export const runtime = "nodejs";

export const authConfig = {
  providers: [GitHub],
  callbacks: {
    async session({ session }) {
      try {
        await connectDB();

        const userData = {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        };

        let user = await User.findOne({ email: userData.email });

        if (!user) {
          await User.create(userData);
        } else {
          await User.updateOne({ email: userData.email }, userData);
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return null;
      }
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
