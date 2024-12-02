-- CreateTable
CREATE TABLE "exercises" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "description" TEXT,
    "duration" INTEGER,
    "difficulty" VARCHAR(50),

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personer" (
    "id" SERIAL NOT NULL,
    "namn" VARCHAR(100),
    "alder" INTEGER,
    "email" VARCHAR(150),

    CONSTRAINT "personer_pkey" PRIMARY KEY ("id")
);
