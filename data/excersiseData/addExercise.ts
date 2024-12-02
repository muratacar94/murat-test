import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.exercises.createMany({
    data: [
      {
        name: "Single Leg Deadlift",
        description: "Do this whenever you feel like you wanna train legs",
      },
      { name: "Bicep Curl", description: "Do this for bigger arms" },
      { name: "Tricep Curl", description: "Do this for bigger arms" },

    ],
  });
  console.log("Excersises added!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => prisma.$disconnect());
