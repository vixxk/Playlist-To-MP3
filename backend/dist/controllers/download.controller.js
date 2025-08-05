"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDownload = void 0;
const prisma_1 = require("../utils/prisma");
const createDownload = async (req, res) => {
    try {
        const { playlistUrl, format, numberOfVideos } = req.body;
        if (!playlistUrl || !format || !numberOfVideos) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const download = await prisma_1.prisma.download.create({
            data: {
                playlistUrl,
                format,
                numberOfVideos,
            },
        });
        return res.status(201).json({ message: "Download Created", download });
    }
    catch (error) {
        console.error("Error creating download:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createDownload = createDownload;
