import React from 'react';

const VideoPlayer = () => {
  return (
    <div className="video-container">
        <iframe
          src="https://giphy.com/embed/JoVV55m3KZHdxlpFZ6"
          title="GIF Player"
          className="giphy-embed"
          allowFullScreen
          sandbox="allow-scripts"
          allow=""
        ></iframe>
        <div className="overlay-text">
        <h1>let's get started</h1>
        <p>make your life easier with synthia</p>
        </div>
    </div>
  );
};

export default VideoPlayer;
