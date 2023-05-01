import { PrismaClient } from "@prisma/client"

export default async (prisma: PrismaClient) => {
    await prisma.diplome.deleteMany();

    // await prisma.diplome.createMany({
    //     data: [
    //         {

    //             type: "Licence",
    //             date_obtention: new Date(),
    //             signedByRector: false,
    //             signedByDoyen: false,
    //             student_id: 1,
    //             user_id: 1,
    //         }

    //     ],
    // })
}