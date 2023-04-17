import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
import { compare } from "bcrypt"
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth"
  },
  // Include user.id on session
  callbacks: {
    jwt ({ token, user }) {
      /* Step 1: update the token based on the user object */

      if (user) {
        token.id = Number(user.id);
        token.nom = user.nom;
        token.prenom = user.prenom;
        token.image = user.image;
        token.role = user.role;
        token.etablissement_id = user.etablissement_id;
      }
      return token;
    },
    session ({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.nom = token.nom;
        session.user.prenom = token.prenom;
        session.user.image = token.image;
        session.user.role = token.role;
        session.user.etablissement_id = token.etablissement_id;
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
        const user = await prisma.user.findFirst({
          where: {
            email,
            //because role_id 2 and 3 have the same login page, i needed this condition
            role_id: Number(role) == 2 ? {
              in: [2, 3]
            } : Number(role)
          },
          include: {
            image: true
          },
        });
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
