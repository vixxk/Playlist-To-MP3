import { Request, Response } from "express";
import { getVideoUrlsFromPlaylist } from "../helpers/parsePlaylist";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { downloadAndConvertToMp3 } from "../helpers/downloadAndConvert";

export const bulkDownloadController = async (req: Request, res: Response) => {
  try {
    const { playlistUrl } = req.body;
    
    if (!playlistUrl) {
      return res.status(400).json({ error: "Playlist URL is required." });
    }
    
    const videoUrls = await getVideoUrlsFromPlaylist(playlistUrl);
    const sessionId = uuidv4();
    const tempDir = path.join(__dirname, `../../temp/${sessionId}`);
    fs.mkdirSync(tempDir, { recursive: true });

    const failedDownloads: string[] = [];

    await Promise.all(videoUrls.map(async (videoUrl, index) => {
      try {
        const fileName = `video_${index + 1}.mp3`;
        const filePath = path.join(tempDir, fileName);
        await downloadAndConvertToMp3(videoUrl, filePath);
      } catch (error) {
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

  } catch (error) {
    console.error("Bulk download error:", error);
    return res.status(500).json({ 
      error: "Failed to process playlist.",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
