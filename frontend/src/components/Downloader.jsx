import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
      const res = await axios.post(`${BACKEND_URL}/api/playlist/bulk-download`, {
        playlistUrl,
      });

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

  const getZipUrl = () => `${BACKEND_URL}/api/download/zip/${sessionId}`;

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          color: white;
          background: #121212; /* Single background color */
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .downloader-container {
          width: 90%;
          max-width: 600px;
          background: #1e1e2f;
          padding: 30px;
          border-radius: 12px;
          margin-top: 50px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6); /* Soft shadow instead of border */
        }

        h2 {
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 14px;
          color: #ccc;
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          outline: none;
          background: #2a2a3d;
          color: white;
          margin-bottom: 15px;
        }

        button {
          background: #ff4d4d;
          border: none;
          padding: 12px 20px;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 10px;
          transition: background 0.2s;
        }

        button:hover:not(:disabled) {
          background: #ff3333;
        }

        button:disabled {
          background: #888;
          cursor: not-allowed;
        }

        .error {
          color: #ff6666;
          margin-top: 10px;
        }

        .success {
          margin-top: 15px;
        }

        .success button {
          background: #28a745;
        }

        .success button:hover {
          background: #1e8e3e;
        }

        hr {
          margin: 30px 0;
          border: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .hero-section {
          text-align: left;
          font-size: 14px;
          color: #ddd;
        }

        .hero-section h3 {
          margin-bottom: 10px;
        }
      `}</style>

      <div className="downloader-container">
        <h2>YouTube Playlist MP3 Downloader</h2>

        <h3>Enter Playlist URL</h3>
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
            It takes some time depending on your internet speed. Please be
            patient while it converts and prepares your ZIP!
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

        <hr />

        <div className="hero-section">
          <h3>🎧 What does this website do?</h3>
          <p>
            This tool lets you download all videos from any public YouTube
            playlist as MP3 audio files in one go! Just paste the playlist link,
            and it will convert each video to MP3 and give you a single ZIP file
            to download.
          </p>
          <p>
            No need to convert videos one by one manually. Perfect for music
            playlists, podcasts, lectures, or any batch of videos you want in
            audio format.
          </p>
        </div>
      </div>
    </>
  );
}
