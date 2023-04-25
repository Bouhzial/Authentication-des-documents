import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";



export const t = initTRPC.create();
export const diplomesRouter = createTRPCRouter({
    getDiplomes: publicProcedure.query(async () => {
        const diplomes = await prisma?.diplome.findMany();
        const students = await prisma?.user.findMany({ where: { role_id: 4 } });
        const data = diplomes!.map((diplome) => {
            const student = students!.find((student) => student.id == diplome.student_id)
            return {
                ...diplome,
                student: student
            }
        })
        return data;
    }),


});