import { PrismaClient } from "@prisma/client"

export default async (prisma: PrismaClient) => {
    await prisma.etablissement.createMany({
        data: [
            {
                id: 1,
                nom: "ENSI",
                adresse: "Tunis",
                telephone: 0,
                email: "das@gmail.com",
            }
        ]
    })

    await prisma.faculty.createMany({
        data: [
            {
                id: 1,
                nom: "FEI",
                etablissement_id: 1,
            }
        ]
    })
    await prisma.departement.createMany({
        data: [
            {
                id: 1,
                nom: "Informatique",
                etablissement_id: 1,
            },
            {
                id: 2,
                nom: "Electronique",
                etablissement_id: 1,
            },
            {
                id: 3,
                nom: "Mecanique",
                etablissement_id: 1,
            },
        ]
    })
}
console.log("Added Etablissement data")