import { PrismaClient } from "@prisma/client";
import { encryptData } from "./encryption-helper";

const prisma = new PrismaClient();


(async () => {
    const diplome = await prisma.diplome.findUnique({
        where: {
            id: 13
        },
        include: {
            student: {
                include: {
                    CursusUniversitaire: {
                        include: {
                            annee: true,
                            departement: true,
                            faculty: true
                        },
                        where: {
                            annee: {
                                isCurrent: true
                            }
                        }
                    }
                }
            }
        }
    });

    console.log(JSON.stringify(diplome))

    console.log(encryptData(JSON.stringify(diplome)))
})()