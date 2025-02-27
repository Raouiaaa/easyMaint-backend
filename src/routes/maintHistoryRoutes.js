import express from "express";
import {addMaintenanceRecord, getAllMaintenanceRecords} from "../controllers/maintHistoryController.js";


const router = express.Router();

router.post("/", addMaintenanceRecord);
router.get("/", getAllMaintenanceRecords);

export default router;