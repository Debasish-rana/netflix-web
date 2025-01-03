import React from "react";
import {  useSelector } from "react-redux";
import useMovieTailerVideo from "./hooks/useMovieTailerVideo";

const VideoBackground = ({ movieId }) => {
  const tailerVideo = useSelector(
    (store) => store.movies?.addNowPlayingMoviesTrailer
  );
  console.log(tailerVideo);
  useMovieTailerVideo(movieId);
  return (
    <div className="w-screen md:pt-0 pt-36">
      <iframe
        className="w-screen aspect-video"
        src={"https://www.youtube.com/embed/" + tailerVideo?.key + "?&autoplay=1&mute=1"}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
