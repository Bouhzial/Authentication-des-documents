import { Prisma, PrismaClient } from "@prisma/client";
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { Role } from "../../../../types/types";
import { createTRPCRouter, issuerProcedure, protectedProcedure, publicProcedure, recteurProcedure } from "../../trpc";
import { hashSync } from "bcrypt";

export const t = initTRPC.create();
export const studentsRouter = createTRPCRouter({

    GetStudents: issuerProcedure.query(async ({ ctx }) => {
        const students = await prisma.etudiant.findMany({
            where: {
                CursusUniversitaire: {
                    some: {
                        annee: {
                            isCurrent: true
                        },
                        departement_id: ctx.session.user.departement_id
                    }
                }
            },
            include: {
                CursusUniversitaire: {}
            }
        });
        return students;
    }),


    GetSuccesfulStudents: issuerProcedure.query(async ({ ctx }) => {
        //get all students ids from diplomas table
        const diplomas = await prisma.diplome.findMany({
            select: {
                student_id: true
            }
        });

        const ids = diplomas.map(d => d.student_id);

        //get all etudiants from etudiant table , where annee universitaire in cursus is current , and niveau in cursus is 3 (l3) or 5 (m2) ,and moyenne in cursus is >= 10
        const students = await prisma.etudiant.findMany({
            where: {
                id: {
                    notIn: ids
                },
                CursusUniversitaire: {
                    some: {
                        annee: {
                            isCurrent: true
                        },
                        niveau: {
                            in: [3, 5]
                        },
                        moyenne_annuelle: {
                            gte: 10
                        },
                        departement_id: ctx.session.user.departement_id
                    }
                }
            },
            include: {
                CursusUniversitaire: {
                    where: {
                        annee: {
                            isCurrent: true

                        },
                        niveau: {
                            in: [3, 5]
                        },
                        moyenne_annuelle: {

                            gte: 10

                        }
                    }
                }
            }
        });

        return students;
    }),
});
