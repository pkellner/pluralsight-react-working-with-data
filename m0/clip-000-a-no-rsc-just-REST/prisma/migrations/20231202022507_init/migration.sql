/*
  Warnings:

  - You are about to drop the column `TimeSpeaking` on the `Speaker` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Speaker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "company" TEXT,
    "twitterHandle" TEXT,
    "userBioShort" TEXT NOT NULL,
    "timeSpeaking" DATETIME
);
INSERT INTO "new_Speaker" ("company", "firstName", "id", "lastName", "twitterHandle", "userBioShort") SELECT "company", "firstName", "id", "lastName", "twitterHandle", "userBioShort" FROM "Speaker";
DROP TABLE "Speaker";
ALTER TABLE "new_Speaker" RENAME TO "Speaker";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
