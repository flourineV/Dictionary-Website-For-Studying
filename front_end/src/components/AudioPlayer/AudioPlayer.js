import {
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Tham chiếu đến phần tử thanh chỉnh âm lượng và icon âm lượng
  const volumeControlRef = useRef(null);
  const volumeIconRef = useRef(null);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Cập nhật progress mượt mà hơn
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  // Thay đổi tiến trình audio
  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  // Thay đổi âm lượng
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // Xác định icon âm lượng dựa trên giá trị volume
  const getVolumeIcon = () => {
    if (volume === 0) {
      return faVolumeXmark; // Tắt âm lượng
    } else if (volume <= 0.5) {
      return faVolumeLow; // Âm lượng thấp
    } else {
      return faVolumeHigh; // Âm lượng cao
    }
  };

  // Ẩn thanh chỉnh âm lượng khi nhấp chuột ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        volumeControlRef.current &&
        !volumeControlRef.current.contains(event.target) &&
        volumeIconRef.current &&
        !volumeIconRef.current.contains(event.target)
      ) {
        setShowVolume(false);
      }
    };

    // Thêm sự kiện click toàn cục
    document.addEventListener("click", handleClickOutside);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute p-4 rounded-lg flex items-center space-x-4 w-[100px] mx-auto ml-10 top-[575px]">
      {/* Ẩn các control mặc định */}
      <audio ref={audioRef} loop>
        <source
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>

      {/* Nút phát/dừng */}
      <button
        onClick={togglePlayPause}
        className="absolute text-white text-xl w-6 h-6 flex items-center -left-9"
      >
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
      </button>

      {/* Thanh tiến trình */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        className="w-64 h-1 bg-black rounded-full cursor-pointer"
      />

      {/* Icon âm lượng và thanh âm lượng */}
      <div className="relative">
        {/* Icon loa */}
        <button
          ref={volumeIconRef} // 🟢 Thêm ref cho icon âm lượng
          onClick={() => setShowVolume(!showVolume)}
          className="text-white text-2xl ml-20"
        >
          <FontAwesomeIcon icon={getVolumeIcon()} />
        </button>

        {/* Thanh âm lượng dọc */}
        {showVolume && (
          <div ref={volumeControlRef}>
            {" "}
            {/* 🟢 Thêm ref cho thanh chỉnh âm lượng */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="absolute -top-12 -right-9 w-24 h-1 bg-gray-400 rounded-full cursor-pointer transform -rotate-90"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
