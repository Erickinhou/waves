import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  songInfo,
  isPlaying,
  currentSong,
  setIsPlaying,
  setSongInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const handleActiveLibrary = (nextPev) => {
    const newSongs = songs.map((state) => {
      if (state.id === nextPev) {
        return {
          ...state,
          active: true,
        };
      } else {
        return {
          ...state,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
  };

  const handleDrag = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const getTime = (time) => {
    if (!time) return "0:00";
    return `${Math.floor(time / 60)}:${("0" + Math.floor(time % 60)).slice(
      -2
    )}`;
  };

  //input range css style
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const handlePlayButton = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === "skip-forward") {
      currentIndex++;
      currentIndex %= songs.length;
    }
    if (direction === "skip-back") {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = songs.length - 1;
      }
    }
    await setCurrentSong(songs[currentIndex]);
    await handleActiveLibrary(songs[currentIndex]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
            onChange={handleDrag}
            type="range"
          />
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          onClick={handlePlayButton}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-foward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
