import React, { useEffect, useState } from "react";

const Song = ({ currentSong, isPlaying }) => {
  const [rotate, setRotate] = useState(0);
  useEffect(() => {
    const Interval = setInterval(function () {
      if (isPlaying) {
        setRotate((rotate + 0.1) % 360);
      }
    }, 15);
    return () => {
      clearInterval(Interval);
    };
  }, [rotate, isPlaying]);
  return (
    <div className="song-container">
      <img
        style={{ transform: `rotate(${rotate}deg)` }}
        src={currentSong.cover}
        alt="song"
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
