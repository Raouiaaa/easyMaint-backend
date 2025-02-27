import prisma from "../config/db.js";

export const addMaintenanceRecord = async (req, res) => {
    try {
      const {
        type_of_maintenance,
        failure_type,
        corrective_maintenance_type,
        problem_sign,
        action_performed,
        spare_parts,
        remark,
        FK_id_assets,   // Foreign key for asset
        FK_id_user,     // Foreign key for user
        FK_id_work_order // Foreign key for work order
      } = req.body;
  
      const newRecord = await prisma.maintenanceHistory.create({
        data: {
          type_of_maintenance,
          failure_type,
          corrective_maintenance_type,
          problem_sign,
          action_performed,
          spare_parts,
          remark,
          asset: { connect: { id_assets: FK_id_assets } }, // Linking to the assets table
          user: { connect: { id_users: FK_id_user } }, // Linking to the users table
          workOrder: { connect: { id_work_order: FK_id_work_order } }, // Linking to the workOrders table
        },
        include: {
          asset: true,
          user: true,
          workOrder: true,
        },
      });
  
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(500).json({ error: "Failed to create maintenance record", details: error.message });
    }
  };
  

export const getAllMaintenanceRecords = async (req, res) => {
    try {
      const records = await prisma.maintenanceHistory.findMany({
        select: {
          id_history: true,
          type_of_maintenance: true,
          FK_id_assets: true
        }
      });
  
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch maintenance records" });
    }
};
  