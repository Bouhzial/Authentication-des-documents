import { Prisma, PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";


//dummy data
const users =
  [
    { id: '1', nom: "Bouhzila", prenom: "Ahmed", date_naissance: "21/07/2003", leui_naissance: "Ain Ouserra", matricule: 202039023985, email: "bouhzilaahmed@gmail.com", role: "rajl", telephone: 555, image: { name: "nkmk", size: 1, lastModified: 1, type: "nkm" } },
    { id: '2', nom: "Kasmi", prenom: "Rafik", date_naissance: "18/07/2002", leui_naissance: "Ouserra", matricule: 123456789, email: "rafikkasmi@gmail.com", role: "chef departement", telephone: 555, image: { name: "nkmk", size: 1, lastModified: 1, type: "nkm" } },
    { id: '3', nom: "Hichem", prenom: "medha", date_naissance: "18/07/2002", leui_naissance: "Ouserra", matricule: 123456789, email: "3tay@gmail.com", role: "doyen", telephone: 555, image: { name: "nkmk", size: 1, lastModified: 1, type: "nkm" } },
    { id: '4', nom: "Haroon", prenom: "kesselha", date_naissance: "18/07/2002", leui_naissance: "Ouserra", matricule: 123456789, email: "hdmii@gmail.com", role: "doyen", telephone: 555, image: { name: "nkmk", size: 1, lastModified: 1, type: "nkm" } }
  ]
//connect to database and use real data

export const t = initTRPC.create();
export const userRouter = createTRPCRouter({

  getUsers: protectedProcedure.query(async () => {
    const users = await prisma?.user.findMany()
    return users;
  }),

  deleteUserById: t.procedure.input(z.number()).mutation(async ({ input }) => {
    console.log('deleting');
    console.log("id: ", input);
    await prisma?.user.delete({
      where: {
        id: input
      }
    })
    console.log('deleted');
  }),


  modifyUser: t.procedure.input(z.object({
    id: z.number(),
    nom: z.string(),
    prenom: z.string(),
    date_naissance: z.string(),
    leui_naissance: z.string(),
    matricule: z.number(),
    email: z.string(),
    role_id: z.number(),
    telephone: z.number(),
  })).mutation(async ({ input }) => {
    console.log('modifying');
    await prisma?.user.update({
      where: {
        id: input.id
      },
      data: {
        nom: input.nom,
        prenom: input.prenom,
        date_naissance: input.date_naissance,
        leui_naissance: input.leui_naissance,
        matricule: input.matricule,
        email: input.email,
        role_id: input.role_id,
        telephone: input.telephone,
      }
    })

    console.log('modified');
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
    faculty: z.string(),
    departement: z.string(),
    image: z.object({ name: z.string(), size: z.number(), lastModified: z.number(), type: z.string(), }),
  })).mutation(async ({ input }) => {
    console.log('adding');

    let n
    input.role == 'Doyen' ? n = 3 : n = 2
    await prisma?.user.create({
      data: {
        nom: input.nom,
        email: input.email,
        prenom: input.prenom,
        date_naissance: input.date_naissance,
        leui_naissance: input.leui_naissance,
        telephone: input.telephone,
        matricule: input.telephone,
        etablissement_id: 1,
        password: "",
        role_id: n,
        faculty: input.faculty,
        departement: input.departement,
      }
    })
    const User = await prisma?.user.findFirst({
      where: {
        email: input.email
      }
    })
    await prisma?.image.create({
      data: {
        user_id: User!.id,
        name: input.image.name,
        size: input.image.size,
        lastModified: input.image.lastModified,
        type: input.image.type,
      }
    })
    console.log('added');
  }),
});
