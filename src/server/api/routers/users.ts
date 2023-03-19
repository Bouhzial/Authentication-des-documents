import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

//dummy data
const users = [{ nom: "Bouhzila", prenom: "Ahmed", date_naissance: "21/07/2003", leui_naissance: "Ain Ouserra", matricule: "202039023985", email: "bouhzilaahmed@gmail.com", role: "Admin", telephone: "05585230746", image: "nkmk9a3k" },
{ nom: "Kasmi", prenom: "Rafik", date_naissance: "18/07/2002", leui_naissance: "Hussein Dey", matricule: "123456789", email: "rafikkasmi@gmail.com", role: "Student", telephone: "05585", image: "" }]
//connect to database and use real data


export const userRouter = createTRPCRouter({

  getUsers: publicProcedure.query(() => {
    return users;
  }),
  AddUser: publicProcedure.input(z.object({
    nom: z.string(),
    prenom: z.string(),
    date_naissance: z.string(),
    leui_naissance: z.string(),
    matricule: z.string(),
    email: z.string(),
    role: z.string(),
    telephone: z.string(),
    image: z.string(),
  })).query(({ input }) => {
    console.log(input);
    return {

    };
  }),
});