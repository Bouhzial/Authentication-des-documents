import { PrismaClient } from "@prisma/client"

export default async (prisma: PrismaClient) => {
    await prisma.role.deleteMany();

    await prisma.role.createMany({
        data: [
            { id: 1, name: "recteur" },
            { id: 2, name: "chef_departement" },
            { id: 3, name: "doyen" },
            { id: 4, name: "student" },
        ],
    })
    console.log('Added Roles data')
}