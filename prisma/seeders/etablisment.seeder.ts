import { PrismaClient } from "@prisma/client"

export default async (prisma: PrismaClient) => {
    await prisma.etablissement.createMany({
        data: [
            {
                id: 1,
                nom: "ENSI",
                adresse: "Tunis",
                telephone: 0,
                email: "das@gmail.com",
            }
        ]
    })

    await prisma.faculty.createMany({
        data: [
            { 
                etablissement_id: 1,
                nom: "FEI",
            }
        ]
    })
    await prisma.departement.createMany({
        data: [
            {
               
                nom: "Informatique",
                etablissement_id: 1,
            },
            {
                
                nom: "Electronique",
                etablissement_id: 1,
            },
            {
              
                nom: "Mecanique",
                etablissement_id: 1,
            },
        ]
    })
}
console.log("Added Etablissement data")