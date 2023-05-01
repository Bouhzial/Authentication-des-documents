import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { prisma } from '../../db'

export const t = initTRPC.create();

export const etablismentRouter = createTRPCRouter({

    GetFacultiesByEtablissement: protectedProcedure.query(async ({ ctx }) => {
        const faculties = await prisma?.faculty.findMany({
            where: {
                etablissement_id: ctx.session.user.etablissement_id
            }
        })
        return faculties
    }),
    GetDepartementsByEtablissement: protectedProcedure.query(async ({ ctx }) => {
        const departements = await prisma?.departement.findMany({
            where: {
                etablissement_id: ctx.session.user.etablissement_id
            }
        })
        return departements
    }),

    GetDepartements: t.procedure.query(async () => {
        const departements = await prisma?.departement.findMany({})
        return departements
    }),

    GetFacultiesByName: t.procedure.input(z.string()).mutation(async ({ input }) => {
        const etablisment = await prisma?.faculty.findFirst({
            where: {
                nom: input
            }
        })
        return etablisment!.id
    }),
    GetDepartemntsByName: t.procedure.input(z.string()).mutation(async ({ input }) => {
        const etablisment = await prisma?.departement.findFirst({
            where: {
                nom: input
            }
        })
        return etablisment!.id
    })
})