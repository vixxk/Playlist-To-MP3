"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylistVideos = void 0;
const parsePlaylist_1 = require("../helpers/parsePlaylist");
const getPlaylistVideos = async (req, res) => {
    try {
        const { playlistUrl } = req.body;
        if (!playlistUrl) {
            return res.status(400).json({ error: "Playlist URL is required" });
        }
        const videoUrls = await (0, parsePlaylist_1.getVideoUrlsFromPlaylist)(playlistUrl);
        return res.status(200).json({
            message: "Video fetched successfully",
            count: videoUrls.length,
            videos: videoUrls,
        });
    }
    catch (error) {
        throw new Error("Failed to fetch playlist videos");
    }
};
exports.getPlaylistVideos = getPlaylistVideos;
