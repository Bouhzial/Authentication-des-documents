import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
export const t = initTRPC.create();

export const etablismentRouter:any = createTRPCRouter({

    GetFacultiesByEtablissement: t.procedure.input(z.number()).mutation(async ({ input }) => {
        const faculties = await prisma?.faculty.findMany({
            where: {
                etablissement_id: input
            }
        })
        return faculties
    }),
    GetDepartementsByEtablissement: t.procedure.input(z.number()).mutation(async ({ input }) => {
        const departements = await prisma?.departement.findMany({
            where: {
                etablissement_id: input
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