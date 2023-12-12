-- CreateTable
CREATE TABLE "Champions" (
    "id" TEXT NOT NULL,
    "key" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Champion Name',
    "title" TEXT NOT NULL DEFAULT 'Title',
    "tags" TEXT NOT NULL DEFAULT 'Support',
    "stats" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT 'Description',
    "icon" TEXT NOT NULL DEFAULT 'Icon',

    CONSTRAINT "champions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "champions_key_key" ON "Champions"("key");
