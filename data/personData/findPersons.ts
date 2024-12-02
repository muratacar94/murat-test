import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allPersons = await prisma.personer.findMany();
  console.log(allPersons);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
