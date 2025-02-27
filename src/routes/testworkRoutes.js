import express from "express";
import {testWorkOrder} from "../controllers/testworkController.js";


const router = express.Router();

router.get('/', testWorkOrder);

export default router;