import express  from "express";
import { getPlaylistVideos } from "../controllers/playlist.controller";
import asyncHandler from "../utils/asyncHandler";
import { bulkDownloadController } from "../controllers/bulkDownload.controller";

const router = express.Router();

router.post("/videos",asyncHandler(getPlaylistVideos));
router.post("/bulk-download", asyncHandler(bulkDownloadController));


export default router;