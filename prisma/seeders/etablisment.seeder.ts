import { PrismaClient } from "@prisma/client"
import { DEPARTEMENTS } from "./raw-data/departements";
import { FACULTIES } from "./raw-data/faculties";

export default async (prisma: PrismaClient) => {
    await prisma.etablissement.deleteMany();
    await prisma.faculty.deleteMany();
    await prisma.departement.deleteMany();

    await prisma.etablissement.createMany({
        data: [
            {
                id: 1,
                nom: "USTHB",
                adresse: "Bab Ezzouar",
                telephone: 0,
                email: "usthb@usthb.com",
            }
        ]
    })

    await prisma.faculty.createMany({
        data: FACULTIES
    })
    await prisma.departement.createMany({
        data: DEPARTEMENTS
    })
}
console.log("Added Etablissement data")