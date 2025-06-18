import React from 'react';
import './App.css';
import TrendingVideos from './TrendingVideos';

// Ensure PUBLIC_URL is accessed correctly in React.
// If you need a reference, use: const publicUrl = process.env.PUBLIC_URL;

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> TrendTube
            </div>
            {/* <button className="btn">Template Button</button> */}
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: 100 }}>
        <div className="hero">
          <div className="subtitle">AI-powered YouTube Trending Video Explorer</div>
          <h1 className="title" style={{ fontSize: '2.25rem' }}>TrendTube</h1>
          <div className="description">
            Discover the hottest trending videos on YouTube, updated in realtime!
          </div>
        </div>
        <TrendingVideos />
      </main>
    </div>
  );
}

export default App;