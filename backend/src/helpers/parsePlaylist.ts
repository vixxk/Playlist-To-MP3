import ytpl from 'ytpl';

export const getVideoUrlsFromPlaylist = async(playlistUrl: string): Promise<string[]> => {
    try {
        const playlist = await ytpl(playlistUrl);
        return playlist.items.map(item => item.shortUrl || item.url);
    } catch (error) {
        console.error("Error fetching playlist:", error);
        throw new Error("Failed to fetch playlist videos");
    }
}