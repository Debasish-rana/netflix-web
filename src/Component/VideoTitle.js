import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-40 md:px-12 px-6 absolute bg-gradient-to-r from-black w-screen aspect-video">
      <div className="text-2xl md:text-6xl text-white pt-20 md:pt-52 pb-3">{title}</div>
      <div className="w-1/3 p-2 m-2 text-white hidden md:block">{overview}</div>
      <button className="md:p-3 p-2 bg-white px-11 rounded-md w-36 md:text-lg text-xs">▶️ Play</button>
      <button className="p-3 bg-white px-11 rounded-md mx-4 hidden md:inline-block">
        More Info
      </button>
    </div>
  );
};

export default VideoTitle;