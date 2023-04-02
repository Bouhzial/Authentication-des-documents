import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { hashSync } from "bcrypt";


export const t = initTRPC.create();
export const userRouter:any = createTRPCRouter({

  getUsers: publicProcedure.query(async () => {
    const users = await prisma?.user.findMany()
    console.log(users);
    return users;
  }),

  getUserById: publicProcedure.input(z.number()).mutation(async ({input}) => {
    const user = await prisma?.user.findFirst({
      where: {
        id: input
      }
    })
    return {nom:user?.nom,password:user?.password};
  }),

 deleteUserById: t.procedure.input(z.number()).mutation(async({ input }) => {
  console.log('deleting');
  console.log("id: ",input);
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
  })).mutation(async({ input }) => {
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


  AddUser : t.procedure.input(z.object({
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
  })).mutation(async({ input }) => { 
    console.log('adding');
       
    let n
    input.role=='Doyen'?n=3:n=2
    const user = await prisma?.user.create({
      data:{
        nom: input.nom,
        email: input.email,
        prenom: input.prenom,
        date_naissance: input.date_naissance,
        leui_naissance: input.leui_naissance,
        telephone: input.telephone,
        matricule: input.matricule,
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
    if(input.image.name!=""){
    
    await prisma?.image.create({
      data: {
        user_id: User!.id,
        name: input.image.name,
        size: input.image.size,
        lastModified: input.image.lastModified,
        type: input.image.type,
      }
      })}
      console.log('added')
      return User;
    }),

    ConfigPassword: t.procedure.input(z.object({
      id: z.number(),
      password: z.string(),
    })).mutation(async({ input }) => {
      const pass = hashSync(input.password, 10)
      await prisma?.user.update({
        where: {
          id: input.id
        },
        data: {
          password: pass,
        }
      })
    }),
    removePassword: t.procedure.input(z.string()).mutation(async({ input }) => {
      const pass = ''
      await prisma?.user.update({
        where: {
          email: input,
        },
        data: {
          password: pass,
        }
      })
    }),
    checkEmailValidity: t.procedure.input(z.string()).mutation(async({ input }) => {
      const user = await prisma?.user.findFirst({
        where: {
          email: input,
        }
      })
      if(user){
        return user.id
      }else{
        return 0
      }
    }),
});

