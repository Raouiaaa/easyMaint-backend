import express from "express";
import {getAllScheduledActions} from "../controllers/scheduledActionsController.js";


const router = express.Router();

router.get("/", getAllScheduledActions);

export default router;