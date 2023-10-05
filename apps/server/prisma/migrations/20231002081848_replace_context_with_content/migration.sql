/*
  Warnings:

  - You are about to drop the `bot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "bot";

-- CreateTable
CREATE TABLE "Bot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "service" TEXT,
    "limitations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bot_name_key" ON "Bot"("name");
