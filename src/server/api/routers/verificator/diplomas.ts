import { Prisma, PrismaClient } from "@prisma/client";
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { Role } from "../../../../types/types";
import { createTRPCRouter, verificatorProcedure } from "../../trpc";
import { hashSync } from "bcrypt";
import emailjs from 'emailjs-com';
import { sendPasswordConfigurationEmail } from "../../../../utils/email-sending";

export const t = initTRPC.create();
export const diplomasRouter = createTRPCRouter({
    //get all diplomas not signed by the recteur yet in pages of 10 diplomas
    GetDiplomas: verificatorProcedure.input(z.number()).query(async ({ input: page }) => {
        const diplomas = await prisma.diplome.findMany({
            where: {
                signedByDoyen: false
            },
            skip: (page - 1) * 10,
            take: 10,
            //include student and it's cursus where annee isCurrent is true
            include: {
                student: {
                    include: {
                        CursusUniversitaire: {
                            where: {
                                annee: {
                                    isCurrent: true
                                }
                            }
                        }
                    }
                }
            }
        })

        return diplomas
    }),

    validateDiploma: verificatorProcedure.input(z.number()).mutation(async ({ input: id }) => {

        await prisma.diplome.update({
            where: {
                id
            },
            data: {
                signedByDoyen: true
            }
        })
        return "Diplome Validé"
    }),

    refuseDiploma: verificatorProcedure.input(z.number()).mutation(async ({ input: id }) => {
        await prisma.diplome.delete({
            where: {
                id
            }
        })
        return "Diplome Refusé"
    }),

});
