import { Prisma, PrismaClient } from "@prisma/client";
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { Role } from "../../../../types/types";
import { createTRPCRouter, issuerProcedure, protectedProcedure, publicProcedure, recteurProcedure } from "../../trpc";
import { hashSync } from "bcrypt";
import emailjs from 'emailjs-com';
import { sendPasswordConfigurationEmail } from "../../../../utils/email-sending";
import { EmailType, createEmailJob } from "../../../queues";


export const t = initTRPC.create();
export const diplomasRouter = createTRPCRouter({

    CreateDiploma: issuerProcedure.input(z.number()).mutation(async ({ input: id }) => {
        //get etudiant data with the current cursus
        const etudiant = await prisma.etudiant.findFirst({
            where: {
                id: id
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
        if (!etudiant || !etudiant.CursusUniversitaire[0]) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Etudiant not found',
            });


        }
        const { nom, prenom, email, matricule, telephone, date_naissance, lieu_naissance } = etudiant;
        const { filiere, faculty_id, departement_id, specialite } = etudiant.CursusUniversitaire[0];
        //create user using etudiant data
        const user = await prisma.user.create({
            data: {
                nom,
                prenom,
                email,
                telephone,
                matricule,
                password: "",
                etablissement_id: 1,
                date_naissance,
                leui_naissance: lieu_naissance,
                role_id: Role.student,
                filiere,
                faculty_id,
                departement_id,
                specialite,
            }
        });
        // send password configuration email
        //using an email queue
        await createEmailJob({
            emailType: EmailType.configPassword,
            userId: user.id,
            name: user.nom,
            userEmail: user.email
        });
        // await sendPasswordConfigurationEmail(user.id, user.nom, user.email);
        // create diploma using etudiant and cursus data
        const diplome = await prisma.diplome.create({
            data: {
                date_obtention: new Date(),
                type: etudiant?.CursusUniversitaire[0]?.niveau == 3 ? "Licence" : "Master",
                student: {
                    connect: {
                        id: etudiant.id
                    }
                },
                user: {
                    connect: {
                        id: user.id
                    }
                },
            }
        });
        return diplome;
    }),

    GetDiplomasByDepartementId: issuerProcedure.query(async ({ ctx }) => {

        const studentsIdsByDepartement = await prisma.etudiant.findMany({
            where: {
                CursusUniversitaire: {
                    some: {
                        departement_id: ctx.session.user.departement_id
                    }
                }
            },
            select: {
                id: true
            }
        });

        const diplomas = await prisma.diplome.findMany({
            where: {
                student_id: {
                    in: studentsIdsByDepartement.map(s => s.id)
                }
            },
            include: {
                student: {
                    include: {
                        CursusUniversitaire: {
                            where: {
                                departement_id: ctx.session.user.departement_id
                            }
                        }
                    }
                },
            }
        });
        return diplomas;
    }),
});
