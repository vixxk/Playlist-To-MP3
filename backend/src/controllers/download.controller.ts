import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const createDownload = async (req: Request, res: Response) => {
  try {
    const { playlistUrl, format, numberOfVideos } = req.body;
    if (!playlistUrl || !format || !numberOfVideos) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const download = await prisma.download.create({
      data: {
        playlistUrl,
        format,
        numberOfVideos,
      },
    });
    return res.status(201).json({ message: "Download Created", download });
  } catch (error) {
    console.error("Error creating download:", error);
    res.status(500).json({ message: "Server error" });
  }
};
