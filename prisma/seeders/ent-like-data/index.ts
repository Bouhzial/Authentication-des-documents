import { PrismaClient } from '@prisma/client'
import anneesSeeder from './annees.seeder';
import etudiantsSeeder from './etudiants.seeder';

export default async (prisma: PrismaClient) => {
    try {
        await prisma.anneeUniversitaire.deleteMany();
        await prisma.etudiant.deleteMany();
        await prisma.cursusUniversitaire.deleteMany();

        await anneesSeeder(prisma);
        await etudiantsSeeder(prisma);
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}