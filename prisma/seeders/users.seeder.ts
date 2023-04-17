import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
export default async (prisma: PrismaClient) => {

    await prisma.user.createMany({
        data: [
            {
                id: 1,
                nom: "recteur",
                prenom: "mol la faq",
                email: "recteur@usthb.dz",
                telephone: "0210858",
                matricule: "123456",
                date_naissance : "1999-01-01",
                leui_naissance : "Tunis",
                password: hashSync("recteur", 10),
                role_id: 1,
                etablissement_id: 1,
            },
        ]
    })
    console.log('Added User data')
}