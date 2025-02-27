import express from "express";
import {addWorkOrder, getAllWorkOrders} from "../controllers/workOrderController.js";

const router = express.Router();

router.post("/", addWorkOrder);
router.get("/", getAllWorkOrders);

export default router;