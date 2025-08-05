"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoUrlsFromPlaylist = void 0;
const ytpl_1 = __importDefault(require("ytpl"));
const getVideoUrlsFromPlaylist = async (playlistUrl) => {
    try {
        const playlist = await (0, ytpl_1.default)(playlistUrl);
        return playlist.items.map(item => item.shortUrl || item.url);
    }
    catch (error) {
        console.error("Error fetching playlist:", error);
        throw new Error("Failed to fetch playlist videos");
    }
};
exports.getVideoUrlsFromPlaylist = getVideoUrlsFromPlaylist;
