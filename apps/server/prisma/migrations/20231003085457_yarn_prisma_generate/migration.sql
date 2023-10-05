-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "message" TEXT,
    "bot_id" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_bot_id_fkey" FOREIGN KEY ("bot_id") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
