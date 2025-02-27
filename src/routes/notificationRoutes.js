import express from "express";
import {addNotification, getAllNotifications} from "../controllers/notificationController.js";


const router = express.Router();

router.post("/", addNotification);
router.get("/", getAllNotifications);


export default router;
