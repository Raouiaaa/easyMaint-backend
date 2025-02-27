import express from "express";
import {addTechSpeci, getAllTechSpeci} from "../controllers/techSpeciController.js";


const router = express.Router();

router.post("/", addTechSpeci);
router.get("/", getAllTechSpeci);

export default router;