/*
  Warnings:

  - Added the required column `sessionStart` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdDate` to the `Attendee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sessionStart" DATETIME NOT NULL
);
INSERT INTO "new_Session" ("description", "id", "title") SELECT "description", "id", "title" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE TABLE "new_Attendee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL
);
INSERT INTO "new_Attendee" ("email", "firstName", "id", "lastName") SELECT "email", "firstName", "id", "lastName" FROM "Attendee";
DROP TABLE "Attendee";
ALTER TABLE "new_Attendee" RENAME TO "Attendee";
CREATE UNIQUE INDEX "Attendee_email_key" ON "Attendee"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
