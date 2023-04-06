import { PrismaClient } from '@prisma/client'
import rolesSeeder from "./roles.seeder";
import usersSeeder from './users.seeder';
import etablissementSeeder from './etablisment.seeder';
import diplomesSeeder from './diplomes.seeder';

const prisma = new PrismaClient()

const load = async () => {
    try {
        // await etablissementSeeder(prisma);
        // await rolesSeeder(prisma);
        //await usersSeeder(prisma);
        await diplomesSeeder(prisma);
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}
load()

