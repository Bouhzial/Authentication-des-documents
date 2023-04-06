import { Prisma, PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";


export const t = initTRPC.create();
export const metaDataRouter = createTRPCRouter({

    getRoles: protectedProcedure.query(async () => {
        const roles = await prisma.role.findMany();
        return roles;
    }),

    getFaculties: protectedProcedure.query(async () => {
        const faculties = await prisma.faculty.findMany();
        return faculties;
    }),

    getDepartments: protectedProcedure.query(async () => {
        const departements = await prisma.departement.findMany();
        return departements;
    }),

});
