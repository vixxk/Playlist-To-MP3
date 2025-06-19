import { getVideoUrlsFromPlaylist } from "../helpers/parsePlaylist";
import { Request, Response } from "express";

export const getPlaylistVideos = async (req: Request, res: Response) => {
  try {
    const { playlistUrl } = req.body;

    if (!playlistUrl) {
      return res.status(400).json({ error: "Playlist URL is required" });
    }

    const videoUrls = await getVideoUrlsFromPlaylist(playlistUrl);

    return res.status(200).json({
      message: "Video fetched successfully",
      count: videoUrls.length,
      videos: videoUrls,
    });
  } catch (error) {
    throw new Error("Failed to fetch playlist videos");
  }
};
