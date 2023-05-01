import { Prisma, PrismaClient } from "@prisma/client";
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { Role } from "../../../../types/types";
import { createTRPCRouter, protectedProcedure, publicProcedure, recteurProcedure } from "../../trpc";
import { hashSync } from "bcrypt";
import { EmailType, createEmailJob } from "../../../queues";
import { prisma } from '../../../db'

export const t = initTRPC.create();
export const userRouter = createTRPCRouter({

    getUsers: recteurProcedure.query(async ({ ctx }) => {
        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    id: ctx.session.user.id,
                },
            }
        })
        return users;
    }),

    getUserById: publicProcedure.input(z.number()).mutation(async ({ input }) => {
        const user = await prisma?.user.findFirst({
            where: {
                id: input
            }
        })
        return { nom: user?.nom, password: user?.password };
    }),

    deleteUserById: recteurProcedure.input(z.number()).mutation(async ({ input }) => {
        try {
            await prisma.user.delete({
                where: {
                    id: input
                }
            })
            return true
        } catch (e) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Cant Delete User" });
        }
    }),

    CreateUser: recteurProcedure.input(z.object({
        nom: z.string(),
        prenom: z.string(),
        date_naissance: z.string(),
        leui_naissance: z.string(),
        matricule: z.string(),
        email: z.string(),
        role_id: z.nativeEnum(Role),
        telephone: z.string(),
        faculty_id: z.number(),
        departement_id: z.number(),
        image: z.object({ name: z.string(), size: z.number(), lastModified: z.string(), type: z.string(), }).optional(),
    })).mutation(async ({ input }) => {

        const { nom, prenom, email, date_naissance, leui_naissance, telephone, matricule, role_id, faculty_id, departement_id, image } = input

        const userWithEmail = await prisma?.user.findFirst({
            where: {
                email
            }
        })



        if (userWithEmail) {
            throw new TRPCError({ code: "BAD_REQUEST", message: "User Exists" });
        }

        const user = await prisma.user.create({
            data: {
                nom,
                email,
                prenom,
                date_naissance,
                leui_naissance,
                telephone,
                matricule,
                etablissement_id: 1,
                password: "",
                role_id,
                faculty_id,
                departement_id,
            }
        })
        if (image) {
            await prisma.image.create({
                data: {
                    user_id: user.id,
                    ...image,
                }
            })
        }


        //  await sendPasswordConfigurationEmail(user.id, user.nom, user.email);

        await createEmailJob({
            emailType: EmailType.configPassword,
            userId: user.id,
            name: user.nom,
            userEmail: user.email
        });

        const { password, ...userDataWithoutPassword } = user
        return userDataWithoutPassword
    }),


    modifyUser: recteurProcedure.input(z.object({
        id: z.number(),
        nom: z.string(),
        prenom: z.string(),
        date_naissance: z.string(),
        leui_naissance: z.string(),
        matricule: z.string(),
        email: z.string(),
        role_id: z.number(),
        telephone: z.string(),
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

    ConfigPassword: t.procedure.input(z.object({
        id: z.number(),
        password: z.string(),
    })).mutation(async ({ input }) => {
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
    removePassword: t.procedure.input(z.string()).mutation(async ({ input }) => {
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
    checkEmailValidity: t.procedure.input(z.string()).mutation(async ({ input }) => {
        const user = await prisma?.user.findFirst({
            where: {
                email: input,
            }
        })
        if (user) {
            return user.id
        } else {
            return 0
        }
    }),



});
