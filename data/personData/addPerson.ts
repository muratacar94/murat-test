import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.personer.createMany({
        data: [
            { namn: 'Morre', alder: 28 },
            { namn: 'Jonne', alder: 34 },
            { namn: 'Bajskorv', alder: 23},
            { namn: 'Jennifer', alder: 22}, 
            { namn: 'Jennifer', alder: 22}, 
        ],
    });
    console.log('Personer tillagda!');
    prisma.personer.findMany().then(console.log)
}

main()
    .catch((e) => console.error(e))
    .finally(async () => prisma.$disconnect());
