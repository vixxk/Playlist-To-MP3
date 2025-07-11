import React, { useState } from "react";
import axios from "axios";

export default function Downloader() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);
    setSessionId("");

    try {
      const res = await axios.post("/api/playlist/bulk-download", {
        playlistUrl,
      });

      console.log("Server Response:", res.data);
      setSessionId(res.data.sessionId);
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to start download. Check your URL or server."
      );
    } finally {
      setLoading(false);
    }
  };

  const getZipUrl = () => `/api/download/zip/${sessionId}`;

  return (
    <div className="downloader-container">
      <h2>Enter Playlist URL</h2>
      <p className="subtitle">
        Paste any public YouTube playlist link below to convert all its videos
        to MP3 files and download them as a single ZIP!
      </p>

      <input
        type="text"
        placeholder="https://youtube.com/playlist?list=..."
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
      />

      <button onClick={handleDownload} disabled={loading || !playlistUrl}>
        {loading ? "Processing... Please wait" : "Start Download"}
      </button>

      {loading && (
        <p className="info">
          It takes some time depending on your internet speed. Please be patient while it converts and prepare your ZIP!
        </p>
      )}

      {error && <p className="error">{error}</p>}

      {success && (
        <div className="success">
          <p>✅ Conversion complete! Your ZIP is ready:</p>
          <a href={getZipUrl()} download>
            <button>Download ZIP</button>
          </a>
        </div>
      )}

      <hr style={{ margin: "30px 0", borderColor: "rgba(255,255,255,0.3)" }} />

      <div className="hero-section">
        <h3>🎧 What does this website do?</h3>
        <p>
          This tool lets you download all videos from any public YouTube playlist
          as MP3 audio files in one go! Just paste the playlist link, and it will
          convert each video to MP3 and give you a single ZIP file to download.
        </p>
        <p>
          No need to convert videos one by one manually. Perfect for music
          playlists, podcasts, lectures, or any batch of videos you want in audio
          format.
        </p>
      </div>
    </div>
  );
}
