/*
  Warnings:

  - You are about to drop the column `content` on the `Bot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bot" DROP COLUMN "content",
ADD COLUMN     "context" TEXT;
