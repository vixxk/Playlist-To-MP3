"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAndConvertToMp3 = void 0;
const path_1 = __importDefault(require("path"));
const ytdl_core_1 = __importDefault(require("@distube/ytdl-core"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs_1 = __importDefault(require("fs"));
const downloadAndConvertToMp3 = async (videoUrl, outputPath) => {
    return new Promise(async (resolve, reject) => {
        try {
            const info = await ytdl_core_1.default.getInfo(videoUrl);
            const tempFilePath = path_1.default.join(path_1.default.dirname(outputPath), `temp_${Date.now()}.webm`);
            const stream = (0, ytdl_core_1.default)(videoUrl, {
                filter: "audioonly",
                quality: "highestaudio",
                highWaterMark: 1 << 25 //Set Buffer Size to 32 MB
            });
            (0, fluent_ffmpeg_1.default)(stream)
                .audioBitrate(128)
                .format("mp3")
                .outputOptions("-id3v2_version", "4")
                .on("start", (commandLine) => {
                console.log(`FFmpeg started with command: ${commandLine}`);
            })
                .on("progress", (progress) => {
                console.log(`Processing: ${Math.round(progress.percent)}% done`);
            })
                .on("end", () => {
                console.log(`Successfully converted: ${videoUrl}`);
                fs_1.default.unlink(tempFilePath, (err) => {
                    if (err)
                        console.error("Temp file cleanup error:", err);
                });
                resolve(outputPath);
            })
                .on("error", (err) => {
                console.error("FFmpeg error:", err);
                reject(new Error(`FFmpeg processing failed: ${err.message}`));
            })
                .save(outputPath);
        }
        catch (err) {
            reject(new Error(`Download failed: ${err instanceof Error ? err.message : "Unknown error"}`));
        }
    });
};
exports.downloadAndConvertToMp3 = downloadAndConvertToMp3;
