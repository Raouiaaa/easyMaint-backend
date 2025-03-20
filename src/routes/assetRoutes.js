import express from "express";
import {createAsset, getAllAssets, updateAssets} from "../controllers/assetController.js";


const router = express.Router();

router.post("/", createAsset);
router.get("/", getAllAssets);
router.put("/:id", updateAssets);

export default router;