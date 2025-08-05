"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const download_controller_1 = require("../controllers/download.controller");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const downloadZip_controller_1 = require("../controllers/downloadZip.controller");
const router = express_1.default.Router();
router.post("/", (0, asyncHandler_1.default)(download_controller_1.createDownload));
router.get("/zip/:sessionId", (0, asyncHandler_1.default)(downloadZip_controller_1.downloadZipController));
exports.default = router;
