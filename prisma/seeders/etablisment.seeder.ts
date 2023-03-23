import { PrismaClient } from "@prisma/client"

export default async (prisma: PrismaClient) => {
    await prisma.etablissement.createMany({
        data: [
            {
                nom: "ENSI",
                adresse: "Tunis",
                telephone: 0,
                email: "das@gmail.com",
            },],
    })
    
    await prisma.faculty.createMany({
        data: [
            {
                nom: "",
                etablissement_id: 1,
            },
            // {
            //     nom: "FST",
            //     etablissement_id: 1,
            // },
            // {
            //     nom: "FSEG",
            //     etablissement_id: 1,
            // },
            // {
            //     nom: "FSE",
            //     etablissement_id: 1,
            // }
        ]
})
   await prisma.departement.createMany({
        data: [
            {
                nom: "",
                etablissement_id: 1,
            },
            {
                nom: "Informatique",
                etablissement_id: 1,
            },
            {
                nom: "Electronique",
                etablissement_id: 1,
            },
            {  nom: "Mecanique",
                etablissement_id: 1,
            },
        ]})
    }
    console.log("Added Etablissement data")