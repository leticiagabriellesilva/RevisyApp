-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "dificuldade" BOOLEAN NOT NULL DEFAULT false
);
