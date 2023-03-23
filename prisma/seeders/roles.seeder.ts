import { PrismaClient } from "@prisma/client"

export default async (prisma: PrismaClient) => {
    await prisma.role.createMany({
        data: [
            { name: "recteur" },
            { name: "chef_departement" },
            { name: "doyen" },
            { name: "student" },
        ],
    })
    console.log('Added Roles data')
}