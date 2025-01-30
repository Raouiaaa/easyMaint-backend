import express from "express";
import {addTechSpeci} from "../controllers/techSpeciController.js";


const router = express.Router();

router.post("/", addTechSpeci);

export default router;