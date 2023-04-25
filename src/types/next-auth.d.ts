import { Image, User as UserType } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import { Role } from './types'


//adding role to the data returned by next auth
interface IUser extends UserType {
  role: Role;
  image: Image | null;
}


declare module "next-auth/jwt" {
  interface JWT extends IUser { }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends IUser {
    id: number;
    image: Image | null;
  }

  interface Session {
    user?: {
      id: number;
      nom: string
      prenom: string
      email: string
      image: Image | null;
      role: Role
      etablissement_id: number
      faculty_id: number
      departement_id: number
    };
  }
  // interface Session {
  //   user?: {
  //     id: string;
  //   } & DefaultSession["user"];
  // }
}
