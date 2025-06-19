import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import archiver from "archiver";

export const downloadZipController = async(req: Request, res: Response) =>{
    try {
        const {sessionId} = req.params;
        const folderPath = path.join(__dirname, `../../temp/${sessionId}`);

        if(!fs.existsSync(folderPath)){
            return res.status(404).json({error : "Session Not Found"});
        }

        const zipFileName = `playlist_${sessionId}.zip`;
        const zipFilePath = path.join(__dirname, `../../temp/${zipFileName}`);

        const archive = archiver("zip", { zlib: { level: 9 } });
        const output = fs.createWriteStream(zipFilePath);

        output.on("close", () => {
            console.log(`ZIP created: ${zipFilePath} (${archive.pointer()} bytes)`);
            res.download(zipFilePath, zipFileName, (err) => {
              if (err) {
                console.error("Download error:", err);
              } else {
                setTimeout(() => {
                    fs.rmSync(folderPath, { recursive: true, force: true });
                    fs.unlinkSync(zipFilePath);
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


    } catch (error) {
      console.error("ZIP Download Error:", error);
      res.status(500).json({ error: "Failed to create or download ZIP" });
    }
    
}





