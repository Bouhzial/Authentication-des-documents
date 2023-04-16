import { PrismaClient } from "@prisma/client"

export default async (prisma: PrismaClient) => {
    await prisma.anneeUniversitaire.createMany({
        data: [
            { id: 1, annee: 2021, isCurrent: false },
            { id: 2, annee: 2022, isCurrent: true },
        ],
    })
    console.log('Added Roles data')
}