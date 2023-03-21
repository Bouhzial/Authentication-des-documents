import { PrismaClient } from "@prisma/client"

export default async (prisma: PrismaClient) => {
    await prisma.role.createMany({
        data: [
            { name: "super-admin" },
            { name: "issuer" },
            { name: "verificator" },
            { name: "student" },
        ],
    })
    console.log('Added Roles data')
}