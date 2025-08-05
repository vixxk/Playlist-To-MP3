"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playlist_controller_1 = require("../controllers/playlist.controller");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const bulkDownload_controller_1 = require("../controllers/bulkDownload.controller");
const router = express_1.default.Router();
router.post("/videos", (0, asyncHandler_1.default)(playlist_controller_1.getPlaylistVideos));
router.post("/bulk-download", (0, asyncHandler_1.default)(bulkDownload_controller_1.bulkDownloadController));
exports.default = router;
