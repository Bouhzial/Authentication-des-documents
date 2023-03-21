import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // See https://next-auth.js.org/configuration/nextjs#caveats, middleware (currently) doesn't support the "database" strategy which is used by default when using an adapter (https://next-auth.js.org/configuration/options#session)
  },
  pages: {
    signIn: "/auth"
  },
  // Include user.id on session
  callbacks: {
    jwt ({ token, user }) {
      /* Step 1: update the token based on the user object */
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session ({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { type: "number" },
      },
      async authorize (credentials) {
        if (!credentials) {
          throw new Error("No credentials.");
        }
        const { email, password, role } = credentials;
        const user = await prisma.user.findFirst({ where: { email, role_id: Number(role) } });
        if (!user) {
          throw new Error("User doesn't exist");
        }
        const match = await compare(password, user.password);
        if (!match) {
          throw new Error("Wrong Password");
        }
        return { ...user, role: user.role_id };
      },
    }),
  ],
};

export default NextAuth(authOptions);
