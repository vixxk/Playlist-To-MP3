import path from "path";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

export const downloadAndConvertToMp3 = async (
  videoUrl: string,
  outputPath: string
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const info = await ytdl.getInfo(videoUrl);
      const tempFilePath = path.join(path.dirname(outputPath), `temp_${Date.now()}.webm`);

      const stream = ytdl(videoUrl, {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25 //Set Buffer Size to 32 MB
      });

      ffmpeg(stream)
        .audioBitrate(128)
        .format("mp3")
        .outputOptions("-id3v2_version", "4") 
        .on("start", (commandLine) => {
          console.log(`FFmpeg started with command: ${commandLine}`);
        })
        .on("progress", (progress) => {
          console.log(`Processing: ${Math.round(progress.percent as number)}% done`);
        })
        .on("end", () => {
          console.log(`Successfully converted: ${videoUrl}`);
          fs.unlink(tempFilePath, (err) => { 
            if (err) console.error("Temp file cleanup error:", err);
          });
          resolve(outputPath);
        })
        .on("error", (err) => {
          console.error("FFmpeg error:", err);
          reject(new Error(`FFmpeg processing failed: ${err.message}`));
        })
        .save(outputPath);

    } catch (err) {
      reject(new Error(`Download failed: ${err instanceof Error ? err.message : "Unknown error"}`));
    }
  });
};
