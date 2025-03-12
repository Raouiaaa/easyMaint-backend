import express from "express";
import {addWorkOrder, getAllWorkOrders, getOverdueWorkOrders} from "../controllers/workOrderController.js";

const router = express.Router();

router.post("/", addWorkOrder);
router.get("/", getAllWorkOrders);
router.get("/overdue-workorders", getOverdueWorkOrders);

export default router;