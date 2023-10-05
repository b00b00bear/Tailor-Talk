-- CreateTable
CREATE TABLE "bot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "service" TEXT,
    "limitations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bot_name_key" ON "bot"("name");
