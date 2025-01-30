-- CreateTable
CREATE TABLE "assets" (
    "id_assets" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "installation_date" DATETIME NOT NULL,
    "sub_category" TEXT NOT NULL,
    "maintenance_frequency_inDays" INTEGER NOT NULL,
    "FK_technical_specifications_id" INTEGER,
    CONSTRAINT "assets_FK_technical_specifications_id_fkey" FOREIGN KEY ("FK_technical_specifications_id") REFERENCES "technicalSpecifications" ("id_technical_specifications") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "technicalSpecifications" (
    "id_technical_specifications" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "equipment_reference" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "rated_voltage" TEXT NOT NULL,
    "rated_current" TEXT NOT NULL,
    "rated_power" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "speed" TEXT NOT NULL,
    "insulation_class" TEXT NOT NULL,
    "ingress_protection" TEXT NOT NULL,
    "operating_temperature_range" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "maintenanceHistory" (
    "id_history" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_of_maintenance" TEXT NOT NULL,
    "failure_type" TEXT NOT NULL,
    "corrective_maintenance_type" TEXT NOT NULL,
    "problem_sign" TEXT NOT NULL,
    "action_performed" TEXT NOT NULL,
    "spare_parts" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "FK_id_assets" INTEGER NOT NULL,
    "FK_id_user" INTEGER NOT NULL,
    "FK_id_work_order" INTEGER NOT NULL,
    CONSTRAINT "maintenanceHistory_FK_id_assets_fkey" FOREIGN KEY ("FK_id_assets") REFERENCES "assets" ("id_assets") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "maintenanceHistory_FK_id_user_fkey" FOREIGN KEY ("FK_id_user") REFERENCES "users" ("id_users") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "maintenanceHistory_FK_id_work_order_fkey" FOREIGN KEY ("FK_id_work_order") REFERENCES "workOrders" ("id_work_order") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "workOrders" (
    "id_work_order" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FK_id_asset" INTEGER NOT NULL,
    "FK_id_user" INTEGER NOT NULL,
    CONSTRAINT "workOrders_FK_id_asset_fkey" FOREIGN KEY ("FK_id_asset") REFERENCES "assets" ("id_assets") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "workOrders_FK_id_user_fkey" FOREIGN KEY ("FK_id_user") REFERENCES "users" ("id_users") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notifications" (
    "id_notifications" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FK_id_assets" INTEGER NOT NULL,
    CONSTRAINT "notifications_FK_id_assets_fkey" FOREIGN KEY ("FK_id_assets") REFERENCES "assets" ("id_assets") ON DELETE RESTRICT ON UPDATE CASCADE
);
