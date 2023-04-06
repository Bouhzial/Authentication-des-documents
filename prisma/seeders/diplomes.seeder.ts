import { PrismaClient } from "@prisma/client"

export default async (prisma: PrismaClient) => {
    await prisma.diplome.createMany({
        data: [
            {
                signedByDoyen: true,
                signedByRector: false,
                date_obtention: '21/07/2020',
                type: "Licence",
                student_id: 7,
            },
            {
                signedByDoyen: false,
                signedByRector: false,
                date_obtention: '21/07/2020',
                type: "Licence",
                student_id: 8,
            },
            {
                signedByDoyen: true,
                signedByRector: false,
                date_obtention: '21/07/2020',
                type: "Licence",
                student_id: 9,
            }
        ],
    })
}