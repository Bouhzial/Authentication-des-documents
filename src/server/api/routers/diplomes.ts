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
    },{
        id: "3",
        signedByDoyen: false,
        signedByPresident: false,
        date_obtention: '21/07/2020',
        student: {
            id: "1",
            nom: "Kasmi",
            prenom: "Rafik",
            matricule: 202039023985,
            typeDiplome: "Licence",
            filiere: "informatique",
            specialite: "electronic",
            dipartement: "electronic",
            email: "bouhzilaahmed2@gmail.com",
            date_naissance: "21/07/2003",
            etablissement: "ENSIAS",
            leui_naissance: "Losandi",
            telephone: 555,
            image: {
                name: "nkmk",
                size: 1,
                lastModified: 1,
                type: "nkm",
            },
        },
    },];

    export const t = initTRPC.create();
    export const diplomesRouter = createTRPCRouter({

        getDiplomes: publicProcedure.query(({ ctx:any }) => {
            return diplomes;
        }),

        getDiplomesSignedByDoyen: publicProcedure.query(({ ctx:any }) => {

            return diplomes.filter((diplome) => diplome.signedByDoyen);
        }),

        doyenValiderDiplome: t.procedure.input(z.string()).mutation(({ input }) => {

            diplomes[diplomes.findIndex((diplome) => diplome.id === input)]!.signedByDoyen = true;    
        }),

        validerDiplome: t.procedure.input(z.string()).mutation(({ input }) => {

            diplomes[diplomes.findIndex((diplome) => diplome.id === input)]!.signedByPresident = true;
        }),
        refuseDiplome: t.procedure.input(z.string()).mutation(({ input }) => {
            //delete the diplome with the id = input
            diplomes.splice(diplomes.findIndex((diplome) => diplome.id === input), 1);
        }),
    });