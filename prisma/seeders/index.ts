import { PrismaClient } from '@prisma/client'
import rolesSeeder from "./roles.seeder";
import usersSeeder from './users.seeder';

const prisma = new PrismaClient()

const load = async () => {
    try {

        // await rolesSeeder(prisma);
        await usersSeeder(prisma);
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}
load()

