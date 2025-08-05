"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadZipController = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const archiver_1 = __importDefault(require("archiver"));
const downloadZipController = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const folderPath = path_1.default.join(__dirname, `../../temp/${sessionId}`);
        if (!fs_1.default.existsSync(folderPath)) {
            return res.status(404).json({ error: "Session Not Found" });
        }
        const zipFileName = `playlist_${sessionId}.zip`;
        const zipFilePath = path_1.default.join(__dirname, `../../temp/${zipFileName}`);
        const archive = (0, archiver_1.default)("zip", { zlib: { level: 9 } });
        const output = fs_1.default.createWriteStream(zipFilePath);
        output.on("close", () => {
            console.log(`ZIP created: ${zipFilePath} (${archive.pointer()} bytes)`);
            res.download(zipFilePath, zipFileName, (err) => {
                if (err) {
                    console.error("Download error:", err);
                }
                else {
                    setTimeout(() => {
                        fs_1.default.rmSync(folderPath, { recursive: true, force: true });
                        fs_1.default.unlinkSync(zipFilePath);
                    }, 60 * 1000);
                }
            });
        });
        archive.on("error", (err) => {
            throw err;
        });
        archive.pipe(output);
        archive.directory(folderPath, false);
        archive.finalize();
    }
    catch (error) {
        console.error("ZIP Download Error:", error);
        res.status(500).json({ error: "Failed to create or download ZIP" });
    }
};
exports.downloadZipController = downloadZipController;
