/*
  Warnings:

  - You are about to drop the column `context` on the `Bot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bot" DROP COLUMN "context",
ADD COLUMN     "content" TEXT;
