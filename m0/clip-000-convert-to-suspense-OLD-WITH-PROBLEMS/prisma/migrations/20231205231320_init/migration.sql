/*
  Warnings:

  - The primary key for the `AttendeeFavorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AttendeeFavorite` table. All the data in the column will be lost.
  - Made the column `company` on table `Speaker` required. This step will fail if there are existing NULL values in that column.
  - Made the column `timeSpeaking` on table `Speaker` required. This step will fail if there are existing NULL values in that column.
  - Made the column `twitterHandle` on table `Speaker` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Speaker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "twitterHandle" TEXT NOT NULL,
    "userBioShort" TEXT NOT NULL,
    "timeSpeaking" DATETIME NOT NULL
);
INSERT INTO "new_Speaker" ("company", "firstName", "id", "lastName", "timeSpeaking", "twitterHandle", "userBioShort") SELECT "company", "firstName", "id", "lastName", "timeSpeaking", "twitterHandle", "userBioShort" FROM "Speaker";
DROP TABLE "Speaker";
ALTER TABLE "new_Speaker" RENAME TO "Speaker";
CREATE TABLE "new_AttendeeFavorite" (
    "attendeeId" TEXT NOT NULL,
    "speakerId" INTEGER NOT NULL,

    PRIMARY KEY ("attendeeId", "speakerId"),
    CONSTRAINT "AttendeeFavorite_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AttendeeFavorite_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speaker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AttendeeFavorite" ("attendeeId", "speakerId") SELECT "attendeeId", "speakerId" FROM "AttendeeFavorite";
DROP TABLE "AttendeeFavorite";
ALTER TABLE "new_AttendeeFavorite" RENAME TO "AttendeeFavorite";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
