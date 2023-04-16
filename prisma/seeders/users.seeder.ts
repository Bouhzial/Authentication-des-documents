import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
export default async (prisma: PrismaClient) => {
    // <--- This line

    await prisma.user.createMany({
        data: [
            // {
            //     nom: "ahmed",
            //     prenom: "bouhzila",
            //     email: "dasdgsdfgas@gmail.com",
            //     password: hashSync("123456", 10),
            //     telephone: 7,
            //     matricule: 1278464564559,
            //     date_naissance: "1999-01-01",
            //     leui_naissance: "Tunis",
            //     role_id: 1,
            //     etablissement_id: 1,
            // },
            {
                nom: "nine",
                prenom: "ryad",
                email: "nineryad@gmail.com",
                password: hashSync("123456", 10),
                telephone: "7",
                matricule: "123456",
                date_naissance: "1999-01-01",
                leui_naissance: "Tunis",
                role_id: 1,
                etablissement_id: 1,
            },
            {
                nom: "Rafik",
                prenom: "Kasmi",
                email: "rafikhdey@gmail.com",
                password: hashSync("rafik007", 10),
                telephone: "6",
                matricule: "1235545",
                date_naissance: "1099-01-11",
                leui_naissance: "Losandi",
                role_id: 2,
                etablissement_id: 1,
                filiere: "Informatique",
                faculty_id: 1,
                departement_id: 1,
                specialite: "Miv",
                typeDiplome: "Master",
            }
        ]
    })
    console.log('Added User data')
}