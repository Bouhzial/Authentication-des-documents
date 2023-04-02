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
                telephone: 55,
                matricule: 55,
                date_naissance: "1099-01-11",
                leui_naissance: "Losandi",
                role_id: 4,
                etablissement_id: 1,
                filiere : "Informatique",
                faculty : 'FST',
                departement: 'informatique',
                specialite : "Miv",
                typeDiplome : "Licence",
        },{
            nom: "brbax",
            prenom: "ryad",
            email: "brbxryad@gmail.com",
            password: hashSync("123456", 10),
            telephone: 558,
            matricule: 558,
            date_naissance: "1099-01-11",
            leui_naissance: "Losandi",
            role_id: 4,
            etablissement_id: 1,
            filiere : "Informatique",
            faculty : 'FST',
            departement: 'informatique',
            specialite : "Miv",
            typeDiplome : "Licence",
    },{
        nom: "lhsn",
        prenom: "ryad",
        email: "lhsnryad@gmail.com",
        password: hashSync("123456", 10),
        telephone: 557,
        matricule: 557,
        date_naissance: "1099-01-11",
        leui_naissance: "Losandi",
        role_id: 4,
        etablissement_id: 1,
        filiere : "Informatique",
        faculty : 'FST',
        departement: 'informatique',
        specialite : "Miv",
        typeDiplome : "Licence",
}
        ]
    })
    console.log('Added User data')
}