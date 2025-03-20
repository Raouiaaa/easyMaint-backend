/*
  Warnings:

  - Added the required column `message` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notifications" (
    "id_notifications" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_id_assets" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    CONSTRAINT "notifications_FK_id_assets_fkey" FOREIGN KEY ("FK_id_assets") REFERENCES "assets" ("id_assets") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_notifications" ("FK_id_assets", "id_notifications") SELECT "FK_id_assets", "id_notifications" FROM "notifications";
DROP TABLE "notifications";
ALTER TABLE "new_notifications" RENAME TO "notifications";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
