import express from "express";
import {addAsset, getAllAssets, updateAsset} from "../controllers/assetController.js";


const router = express.Router();

router.post("/", addAsset);
router.get("/", getAllAssets);
router.put("/update-asset/:id", updateAsset);

export default router;