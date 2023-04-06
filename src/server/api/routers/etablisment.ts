import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc"
;
export const t = initTRPC.create();

export const etablismentRouter:any = createTRPCRouter({
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