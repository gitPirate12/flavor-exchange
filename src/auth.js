import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectDB } from "./lib/db";
import User from "./models/User";

// Force Node.js runtime
export const runtime = "nodejs";

export const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in", 
  },
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
          user = await User.create(userData);
        } else {
          await User.updateOne({ email: userData.email }, userData);
        }

        session.user.id = user._id.toString();

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return null;
      }
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);