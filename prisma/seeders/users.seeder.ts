import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
export default async (prisma: PrismaClient) => {
    await prisma.user.deleteMany();

    await prisma.user.createMany({
        data: [
            {
                id: 1,
                nom: "recteur",
                prenom: "mol la faq",
                email: "recteur@usthb.dz",
                telephone: "02108585",
                matricule: "123457",
                date_naissance: "1999-01-01",
                leui_naissance: "Tunis",
                password: hashSync("recteur", 10),
                role_id: 1,
                etablissement_id: 1,
            },
            {
                id: 2,
                nom: "cheft dept",
                prenom: "mol la dept",
                email: "chefdept@usthb.dz",
                telephone: "02108581",
                matricule: "1234568",
                date_naissance: "1999-01-01",
                leui_naissance: "Tunis",
                password: hashSync("dept", 10),
                role_id: 2,
                etablissement_id: 1,
                faculty_id: 1,
                departement_id: 1
            },
            {
                id: 3,
                nom: "doyen",
                prenom: "mol la faqulté",
                email: "doyen@usthb.dz",
                telephone: "02108582",
                matricule: "1234569",
                date_naissance: "1999-01-01",
                leui_naissance: "Tunis",
                password: hashSync("doyen", 10),
                role_id: 3,
                etablissement_id: 1,
                faculty_id: 1,
                departement_id: 1
            },
        ]
    })
    console.log('Added User data')
}