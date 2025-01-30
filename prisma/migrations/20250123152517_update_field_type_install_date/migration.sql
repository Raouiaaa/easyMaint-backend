/*
  Warnings:

  - You are about to alter the column `installation_date` on the `assets` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_assets" (
    "id_assets" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "installation_date" INTEGER NOT NULL,
    "sub_category" TEXT NOT NULL,
    "maintenance_frequency_inDays" INTEGER NOT NULL,
    "FK_technical_specifications_id" INTEGER,
    CONSTRAINT "assets_FK_technical_specifications_id_fkey" FOREIGN KEY ("FK_technical_specifications_id") REFERENCES "technicalSpecifications" ("id_technical_specifications") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_assets" ("FK_technical_specifications_id", "category", "id_assets", "installation_date", "location", "maintenance_frequency_inDays", "name", "sub_category") SELECT "FK_technical_specifications_id", "category", "id_assets", "installation_date", "location", "maintenance_frequency_inDays", "name", "sub_category" FROM "assets";
DROP TABLE "assets";
ALTER TABLE "new_assets" RENAME TO "assets";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
