import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    // Insert priorities if they don't exist
    await prisma.priority.createMany({
        data: [
            { name: 'low' },
            { name: 'medium' },
            { name: 'high' },
        ],
        skipDuplicates: true,
    });

    console.log('Seeded priorities.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => { 
        await prisma.$disconnect();
    });