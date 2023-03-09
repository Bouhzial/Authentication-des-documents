import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";


//dummy data
const users=
[
{ id:'1', nom: "Bouhzila",prenom: "Ahmed", date_naissance: "21/07/2003", leui_naissance:"Ain Ouserra", matricule: 202039023985, email: "bouhzilaahmed@gmail.com", role:"rajl",telephone:555,image:{name:"nkmk",size:1,lastModified:1,type:"nkm"} },
{ id:'2', nom: "Kasmi",prenom: "Rafik", date_naissance: "18/07/2002", leui_naissance:"Ouserra", matricule: 123456789, email: "rafikkasmi@gmail.com", role:"chef departement",telephone:555, image:{name:"nkmk",size:1,lastModified:1,type:"nkm"} },
{ id:'3', nom: "Hichem",prenom: "medha", date_naissance: "18/07/2002", leui_naissance:"Ouserra", matricule: 123456789, email: "3tay@gmail.com", role:"doyen",telephone:555, image:{name:"nkmk",size:1,lastModified:1,type:"nkm"} },
{ id:'4', nom: "Haroon",prenom: "kesselha", date_naissance: "18/07/2002", leui_naissance:"Ouserra", matricule: 123456789, email: "hdmii@gmail.com", role:"doyen",telephone:555, image:{name:"nkmk",size:1,lastModified:1,type:"nkm"} }
]
//connect to database and use real data

export const t = initTRPC.create();
export const userRouter = createTRPCRouter({
    
    getUsers: publicProcedure.query(({ ctx }) => {
      return users;
    }),

    deleteUserById: t.procedure.input(z.string()).mutation(({ input }) => {
      //deletes user form database based on id
      users.splice(users.findIndex((user) => user.id === input), 1);

  }),
    modifyUser: t.procedure.input(z.object({
      id: z.string(),
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
      //modifies the user in the database based on id
      users[users.findIndex((user) => user.id === input.id)] = input;
      
  }),


    AddUser: t.procedure.input(z.object({ 
        id: z.string(),
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