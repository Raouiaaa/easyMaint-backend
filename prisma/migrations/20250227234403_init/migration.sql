/*
  Warnings:

  - You are about to drop the column `FK_id_user` on the `maintenanceHistory` table. All the data in the column will be lost.
  - You are about to drop the column `FK_id_work_order` on the `maintenanceHistory` table. All the data in the column will be lost.
  - You are about to drop the column `corrective_maintenance_type` on the `maintenanceHistory` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "scheduledActions" (
    "id_scheduled_actions" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_id_assets" INTEGER NOT NULL,
    CONSTRAINT "scheduledActions_FK_id_assets_fkey" FOREIGN KEY ("FK_id_assets") REFERENCES "assets" ("id_assets") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_maintenanceHistory" (
    "id_history" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_of_maintenance" TEXT NOT NULL,
    "failure_type" TEXT NOT NULL,
    "problem_sign" TEXT,
    "action_performed" TEXT NOT NULL,
    "spare_parts" TEXT,
    "remark" TEXT,
    "FK_id_assets" INTEGER NOT NULL,
    CONSTRAINT "maintenanceHistory_FK_id_assets_fkey" FOREIGN KEY ("FK_id_assets") REFERENCES "assets" ("id_assets") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_maintenanceHistory" ("FK_id_assets", "action_performed", "created_at", "failure_type", "id_history", "problem_sign", "remark", "spare_parts", "type_of_maintenance") SELECT "FK_id_assets", "action_performed", "created_at", "failure_type", "id_history", "problem_sign", "remark", "spare_parts", "type_of_maintenance" FROM "maintenanceHistory";
DROP TABLE "maintenanceHistory";
ALTER TABLE "new_maintenanceHistory" RENAME TO "maintenanceHistory";
CREATE TABLE "new_workOrders" (
    "id_work_order" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "start_date" DATETIME,
    "end_date" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FK_id_asset" INTEGER NOT NULL,
    "FK_id_user" INTEGER NOT NULL,
    CONSTRAINT "workOrders_FK_id_asset_fkey" FOREIGN KEY ("FK_id_asset") REFERENCES "assets" ("id_assets") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "workOrders_FK_id_user_fkey" FOREIGN KEY ("FK_id_user") REFERENCES "users" ("id_users") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workOrders" ("FK_id_asset", "FK_id_user", "created_at", "end_date", "id_work_order", "start_date", "status") SELECT "FK_id_asset", "FK_id_user", "created_at", "end_date", "id_work_order", "start_date", "status" FROM "workOrders";
DROP TABLE "workOrders";
ALTER TABLE "new_workOrders" RENAME TO "workOrders";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
