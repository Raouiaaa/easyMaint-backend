-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_scheduledActions" (
    "id_scheduled_actions" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "FK_id_assets" INTEGER NOT NULL,
    CONSTRAINT "scheduledActions_FK_id_assets_fkey" FOREIGN KEY ("FK_id_assets") REFERENCES "assets" ("id_assets") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_scheduledActions" ("FK_id_assets", "id_scheduled_actions", "type") SELECT "FK_id_assets", "id_scheduled_actions", "type" FROM "scheduledActions";
DROP TABLE "scheduledActions";
ALTER TABLE "new_scheduledActions" RENAME TO "scheduledActions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
