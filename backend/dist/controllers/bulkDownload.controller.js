"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkDownloadController = void 0;
const parsePlaylist_1 = require("../helpers/parsePlaylist");
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const downloadAndConvert_1 = require("../helpers/downloadAndConvert");
const bulkDownloadController = async (req, res) => {
    try {
        const { playlistUrl } = req.body;
        if (!playlistUrl) {
            return res.status(400).json({ error: "Playlist URL is required." });
        }
        const videoUrls = await (0, parsePlaylist_1.getVideoUrlsFromPlaylist)(playlistUrl);
        const sessionId = (0, uuid_1.v4)();
        const tempDir = path_1.default.join(__dirname, `../../temp/${sessionId}`);
        fs_1.default.mkdirSync(tempDir, { recursive: true });
        const failedDownloads = [];
        await Promise.all(videoUrls.map(async (videoUrl, index) => {
            try {
                const fileName = `video_${index + 1}.mp3`;
                const filePath = path_1.default.join(tempDir, fileName);
                await (0, downloadAndConvert_1.downloadAndConvertToMp3)(videoUrl, filePath);
            }
            catch (error) {
                console.error(`Failed to download ${videoUrl}:`, error);
                failedDownloads.push(videoUrl);
            }
        }));
        return res.status(200).json({
            message: "Download process completed",
            sessionId,
            total: videoUrls.length,
            success: videoUrls.length - failedDownloads.length,
            failed: failedDownloads.length,
            folder: `/api/download/zip/${sessionId}`
        });
    }
    catch (error) {
        console.error("Bulk download error:", error);
        return res.status(500).json({
            error: "Failed to process playlist.",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
};
exports.bulkDownloadController = bulkDownloadController;
