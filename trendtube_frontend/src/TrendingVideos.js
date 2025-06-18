import React, { useState, useEffect } from 'react';

/**
 * PUBLIC_INTERFACE
 * TrendingVideos displays trending YouTube videos by fetching data from the YouTube Data API.
 * 
 * Best Practices Note:
 * - API keys exposed in frontend code are at risk of public access. 
 *   In production, proxy requests through a secure backend. 
 *   For demo/personal/limited public quota use, controlled exposure is acceptable.
 */
function TrendingVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Use environment variable for API key if provided, fallback to directly provided key
  // IMPORTANT: For production use, serve API via a backend to avoid exposing the key.
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || 'AIzaSyAplX_Adv2vKd43NddKflZNWdfbh4yHWoU';
  const TRENDING_API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=15&regionCode=US&key=${YOUTUBE_API_KEY}`;

  useEffect(() => {
    setLoading(true);
    fetch(TRENDING_API_URL)
      .then(async (response) => {
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error?.message || 'Failed to fetch trending videos.');
        }
        return response.json();
      })
      .then((data) => {
        setVideos(Array.isArray(data.items) ? data.items : []);
        setApiError(null);
      })
      .catch((err) => {
        setApiError(err.message);
        setVideos([]);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container" style={{ marginTop: 32 }}>
      <h2 style={{ color: 'var(--base-light)' }}>Trending Videos</h2>
      {loading && <div>Loading...</div>}
      {apiError && <div style={{ color: 'red' }}>Error: {apiError}</div>}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 24, 
          justifyContent: 'center' 
        }}
      >
        {!loading && !apiError && videos.length === 0 && (
          <div>No trending videos found.</div>
        )}
        {videos.map((video) => (
          <div 
            key={video.id} 
            style={{ 
              width: 280, 
              backgroundColor: 'rgba(255,255,255,0.03)', 
              borderRadius: 12,
              padding: 8,
              boxShadow: '0 2px 10px rgba(0,0,0,.08)'
            }}
          >
            <a 
              href={`https://www.youtube.com/watch?v=${video.id}`} 
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                textDecoration: 'none', 
                color: 'inherit' 
              }}
            >
              <img 
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                style={{
                  width: '100%',
                  borderRadius: 8,
                  marginBottom: 8,
                  objectFit: 'cover',
                  minHeight: 160
                }}
              />
              <div style={{ 
                fontWeight: '600', 
                fontSize: 16, 
                color: 'var(--text-color)',
                marginBottom: 4,
                minHeight: 40,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {video.snippet.title}
              </div>
              <div style={{ 
                fontSize: 13, 
                color: 'var(--text-secondary)',
                marginBottom: 4,
              }}>
                {video.snippet.channelTitle}
              </div>
              <div style={{
                fontSize: 12,
                color: 'var(--text-secondary)'
              }}>
                {Number(video.statistics.viewCount).toLocaleString()} views
              </div>
            </a>
          </div>
        ))}
      </div>
      <div style={{ margin: 18, color: 'var(--text-secondary)', fontSize: 13 }}>
        Data from <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--base-light)' }}>YouTube</a>
      </div>
    </div>
  );
}

export default TrendingVideos;
