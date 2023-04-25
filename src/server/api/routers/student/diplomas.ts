import { initTRPC } from "@trpc/server";
import { createTRPCRouter ,studentProcedure} from "../../trpc";
import { z } from "zod";

export const t = initTRPC.create();
export const diplomasRouter = createTRPCRouter({

    GetDiplomasByUserEmail: studentProcedure.input(z.string()).query(async ({ input}) => {
        const id = await prisma.etudiant.findFirst({
            where: {
                email: input,
            },
            select: {
                id: true
            }
        })
        const diplomas = await prisma.diplome.findMany({
            where: {
                student_id: id?.id
            },
            include: {
                student: {
                    include: {
                        CursusUniversitaire: true
                }
            }}
        })
        console.log(diplomas);
        
        return diplomas
    })
});