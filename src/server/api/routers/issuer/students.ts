import { Prisma, PrismaClient } from "@prisma/client";
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { Role } from "../../../../types/types";
import { createTRPCRouter, issuerProcedure, protectedProcedure, publicProcedure, recteurProcedure } from "../../trpc";
import { hashSync } from "bcrypt";
import emailjs from 'emailjs-com';

export const t = initTRPC.create();
export const studentsRouter = createTRPCRouter({

    GetSuccesfulStudents: issuerProcedure.query(async () => {
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
                        }
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
