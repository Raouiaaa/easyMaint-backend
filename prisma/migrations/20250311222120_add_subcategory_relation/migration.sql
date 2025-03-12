/*
  Warnings:

  - You are about to drop the column `sub_category` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `FK_id_assets` on the `scheduledActions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `scheduledActions` table. All the data in the column will be lost.
  - Added the required column `FK_asset_id` to the `scheduledActions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FK_id_sub` to the `scheduledActions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dynamicDate` to the `scheduledActions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "subCategory" (
    "id_sub" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "actions" (
    "id_actions" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "FK_subcategory_id" INTEGER NOT NULL,
    CONSTRAINT "actions_FK_subcategory_id_fkey" FOREIGN KEY ("FK_subcategory_id") REFERENCES "subCategory" ("id_sub") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_assets" (
    "id_assets" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "installation_date" INTEGER NOT NULL,
    "maintenance_frequency_inDays" INTEGER NOT NULL,
    "FK_technical_specifications_id" INTEGER,
    "FK_subCategory_id" INTEGER,
    CONSTRAINT "assets_FK_technical_specifications_id_fkey" FOREIGN KEY ("FK_technical_specifications_id") REFERENCES "technicalSpecifications" ("id_technical_specifications") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "assets_FK_subCategory_id_fkey" FOREIGN KEY ("FK_subCategory_id") REFERENCES "subCategory" ("id_sub") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_assets" ("FK_technical_specifications_id", "category", "id_assets", "installation_date", "location", "maintenance_frequency_inDays", "name") SELECT "FK_technical_specifications_id", "category", "id_assets", "installation_date", "location", "maintenance_frequency_inDays", "name" FROM "assets";
DROP TABLE "assets";
ALTER TABLE "new_assets" RENAME TO "assets";
CREATE TABLE "new_scheduledActions" (
    "id_scheduled_actions" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_asset_id" INTEGER NOT NULL,
    "FK_id_sub" INTEGER NOT NULL,
    "dynamicDate" DATETIME NOT NULL,
    CONSTRAINT "scheduledActions_FK_asset_id_fkey" FOREIGN KEY ("FK_asset_id") REFERENCES "assets" ("id_assets") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "scheduledActions_FK_id_sub_fkey" FOREIGN KEY ("FK_id_sub") REFERENCES "subCategory" ("id_sub") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_scheduledActions" ("id_scheduled_actions") SELECT "id_scheduled_actions" FROM "scheduledActions";
DROP TABLE "scheduledActions";
ALTER TABLE "new_scheduledActions" RENAME TO "scheduledActions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
