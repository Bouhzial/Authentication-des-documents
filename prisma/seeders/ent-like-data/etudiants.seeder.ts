import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
export default async (prisma: PrismaClient) => {
    //create students
    await prisma.etudiant.createMany({
        data: [
            {
                id: 1,
                nom: "Kasmi",
                prenom: "Rafik",
                email: "kasmi.rafik@outlook.com",
                telephone: "123456787",
                matricule: "202031049367",
                date_naissance: "1099-01-11",
                lieu_naissance: "Losandi"
            },
            {
                id: 2,
                nom: "Bouhzila",
                prenom: "Ahmed",
                email: "bhzl@gmail.com",
                telephone: "123456788",
                matricule: "1235545",
                date_naissance: "1099-01-11",
                lieu_naissance: "Losandi"
            },
            {
                id: 3,
                nom: "hmar",
                prenom: "hmar",
                email: "bhz1l@gmail.com",
                telephone: "123456789",
                matricule: "123552245",
                date_naissance: "1099-01-11",
                lieu_naissance: "Losandi"
            }
        ]
    })
    console.log('Added Etudiants data')
    //adding cursus
    await prisma.cursusUniversitaire.createMany({
        data: [
            {
                specialite: "ACAD",
                section: "B",
                niveau: 3,
                groupe: "1",
                filiere: "Math Informatique",
                faculty_id: 1,
                departement_id: 1,
                moyenne_annuelle: 13.60,
                annee_id: 2,
                etudiant_id: 1,
            },
            {
                specialite: "ACAD",
                section: "B",
                niveau: 3,
                groupe: "3",
                filiere: "Math Informatique",
                faculty_id: 1,
                departement_id: 1,
                moyenne_annuelle: 18.99,
                annee_id: 2,
                etudiant_id: 2
            },
            {
                specialite: "ACAD",
                section: "B",
                niveau: 3,
                groupe: "2",
                filiere: "Math Informatique",
                faculty_id: 1,
                departement_id: 1,
                moyenne_annuelle: 5.99,
                annee_id: 2,
                etudiant_id: 3
            }
        ]
    })
    console.log('Added Cursus data')
}