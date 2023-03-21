import { PrismaClient } from "@prisma/client"
import { hashSync } from 'bcrypt'
export default async (prisma: PrismaClient) => {
    await prisma.user.createMany({
        data: [
            { name: "Rafik Kasmi", email: "rafikhdey@gmail.com", phone_number: "0792835272", password: hashSync("rafik007", 10), role_id: 1 },
        ],
    })
    console.log('Added User data')
}