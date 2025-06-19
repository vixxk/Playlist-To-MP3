import express from "express";
import { createDownload } from "../controllers/download.controller";
import asyncHandler from "../utils/asyncHandler";
import { downloadZipController } from "../controllers/downloadZip.controller";


const router = express.Router();

router.post("/", asyncHandler(createDownload));
router.get("/zip/:sessionId", asyncHandler(downloadZipController));


export default router;