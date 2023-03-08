import { initTRPC } from "@trpc/server";
import { number, optional, z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";


//dummy data
const users=
[
{ nom: "Bouhzila",prenom: "Ahmed", date_naissance: "21/07/2003", leui_naissance:"Ain Ouserra", matricule: 202039023985, email: "bouhzilaahmed@gmail.com", role:"nyakRafik",telephone:555,image:{name:"nkmk",size:1,lastModified:1,type:"nkm"} },
{ nom: "Kasmi",prenom: "Rafik", date_naissance: "18/07/2002", leui_naissance:"Znoni", matricule: 123456789, email: "rafikkasmi@gmail.com", role:"mtnak",telephone:555, image:{name:"nkmk",size:1,lastModified:1,type:"nkm"} },
{ nom: "Hichem",prenom: "medha", date_naissance: "18/07/2002", leui_naissance:"Znoni", matricule: 123456789, email: "3tay@gmail.com", role:"nikmo",telephone:555, image:{name:"nkmk",size:1,lastModified:1,type:"nkm"} },
{ nom: "Haroon",prenom: "kesselha", date_naissance: "18/07/2002", leui_naissance:"Znoni", matricule: 123456789, email: "hdmii@gmail.com", role:"ynik",telephone:555, image:{name:"nkmk",size:1,lastModified:1,type:"nkm"} }]
//connect to database and use real data

export const t = initTRPC.create();
export const userRouter = createTRPCRouter({
    
    getUsers: publicProcedure.query(({ ctx }) => {
      return users;
    }),

    AddUser: t.procedure.input(z.object({ 
        nom: z.string(),
        prenom: z.string(),
        date_naissance: z.string(),
        leui_naissance: z.string(),
        matricule: z.number(),
        email: z.string(),
        role: z.string(),
        telephone: z.number(),
        image: z.object({name: z.string(), size: z.number(), lastModified: z.number(), type: z.string(),}),
     })).mutation(({ input }) => {
        //add user to database
        users.push(input)
    }),
  });