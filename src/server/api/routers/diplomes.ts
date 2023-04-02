import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

//add dymmy data for diplomes
const diplomes = [
    {
        id: "1",
        signedByDoyen: true,
        signedByPresident: false,
        date_obtention: '21/07/2020',
        student: {
            id: "1",
            nom: "Bouhzila",
            prenom: "Ahmed",
            matricule: 202039023985,
            typeDiplome: "Licence",
            filiere: "informatique",
            specialite: "informatique",
            dipartement: "informatique",
            email: "bouhzilaahmed2@gmail.com",
            date_naissance: "21/07/2003",
            etablissement: "ENSIAS",
            leui_naissance: "Ain Ouserra",
            telephone: 555,
            image: {
                name: "nkmk",
                size: 1,
                lastModified: 1,
                type: "nkm",
            },
        },
    },
    {
        id: "2",
        signedByDoyen: true,
        signedByPresident: false,
        date_obtention: '21/07/2020',
        student: {
            id: "1",
            nom: "ZBI",
            prenom: "(LWAJDI)",
            matricule: 202039023985,
            typeDiplome: "Licence",
            filiere: "informatique",
            specialite: "informatique",
            dipartement: "informatique",
            email: "bouhzilaahmed2@gmail.com",
            date_naissance: "21/07/2003",
            etablissement: "ENSIAS",
            leui_naissance: "Ain Ouserra",
            telephone: 555,
            image: {
                name: "nkmk",
                size: 1,
                lastModified: 1,
                type: "nkm",
            },
        },
    }];

    export const t = initTRPC.create();
    export const diplomesRouter = createTRPCRouter({
        getDiplomes: publicProcedure.query(async() => {
            const diplomes = await prisma?.diplome.findMany();
            const students = await prisma?.user.findMany({where: {role_id: 4}});
            const data = diplomes!.map((diplome) => {
                const student = students!.find((student) => student.id == diplome.student_id)
                return {
                  ...diplome,
                  student: student
                }
              })
            return data;
        }),

        validerDiplome: t.procedure.input(z.string()).mutation(async({ input }) => {
            
            await prisma?.diplome.update({
                where: {
                    id: input
                },
                data: {
                    signedByRector: true
                }
            })
        }),
        refuseDiplome: t.procedure.input(z.string()).mutation(async({ input }) => {
            await prisma?.diplome.delete({
                where: {
                    id: input
                }
            })

        }),
    });