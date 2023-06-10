/*
  Warnings:

  - You are about to drop the column `folder` on the `Serie` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Serie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "titleAlter" TEXT,
    "description" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "releaseYear" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Serie" ("cover", "createdAt", "description", "id", "releaseYear", "title", "titleAlter", "updatedAt") SELECT "cover", "createdAt", "description", "id", "releaseYear", "title", "titleAlter", "updatedAt" FROM "Serie";
DROP TABLE "Serie";
ALTER TABLE "new_Serie" RENAME TO "Serie";
CREATE UNIQUE INDEX "Serie_title_key" ON "Serie"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
