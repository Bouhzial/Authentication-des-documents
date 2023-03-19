import { DefaultSession, DefaultUser } from "next-auth";


export enum Role {
  superAdmin = 1,
  issuer = 2,
  verificator = 3,
  student = 4
}
//adding role to the data returned by next auth
interface IUser extends DefaultUser {
  role?: Role;
}

declare module "next-auth/jwt" {
  interface JWT extends IUser { }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends IUser { }

  interface Session {
    user?: User & DefaultSession["user"];
  }
  // interface Session {
  //   user?: {
  //     id: string;
  //   } & DefaultSession["user"];
  // }
}
