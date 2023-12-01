-- CreateTable
CREATE TABLE "Champions" (
    "id" SERIAL NOT NULL,
    "text" TEXT,
    "key" INTEGER,
    "name" TEXT,
    "title" TEXT,
    "tags" TEXT,
    "stats" DOUBLE PRECISION,
    "description" TEXT,

    CONSTRAINT "Champions_pkey" PRIMARY KEY ("id")
);
