import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import downloadRoute from "./routes/download.route";
import playlistRoutes from "./routes/playlist.route";
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({ origin: "*" }));

app.get("/", (req,res) =>{
    res.send("Server is running");
})

app.use("/api/download", downloadRoute);
app.use("/api/playlist", playlistRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});