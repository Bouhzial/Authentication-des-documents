import { PrismaClient } from "@prisma/client"

export default async (prisma: PrismaClient) => {
    await prisma.etablissement.deleteMany();
    await prisma.faculty.deleteMany();
    await prisma.departement.deleteMany();

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
                etablissement_id: 1,
                nom: "Faculté Informatique",
            },
            {
                id: 2,
                etablissement_id: 1,
                nom: "Faculté Electronique",
            }
        ]
    })
    await prisma.departement.createMany({
        data: [
            {
                id: 1,
                nom: "SIQ",
                faculty_id: 1,
                etablissement_id: 1,
            },
            {
                id: 2,
                nom: "IA",
                faculty_id: 1,
                etablissement_id: 1,
            },
            {
                id: 3,
                nom: "Telecommunication",
                faculty_id: 2,
                etablissement_id: 1,
            },
        ]
    })
}
console.log("Added Etablissement data")