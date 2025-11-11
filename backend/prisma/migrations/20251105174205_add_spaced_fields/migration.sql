-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "dificuldade" BOOLEAN NOT NULL DEFAULT false,
    "repeticoes" INTEGER NOT NULL DEFAULT 0,
    "intervalo" INTEGER NOT NULL DEFAULT 0,
    "fatorFacilidade" REAL NOT NULL DEFAULT 2.5,
    "qualidade" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastReview" DATETIME,
    "nextReview" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Card" ("createdAt", "dificuldade", "fatorFacilidade", "id", "intervalo", "lastReview", "nextReview", "pergunta", "qualidade", "repeticoes", "resposta", "updatedAt") SELECT "createdAt", "dificuldade", "fatorFacilidade", "id", "intervalo", "lastReview", "nextReview", "pergunta", "qualidade", "repeticoes", "resposta", "updatedAt" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
