import { useState, useRef, useEffect } from "react";
import './control.css'

function BgmControl({ audioRef }) {
  const sliderRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [thumbLeft, setThumbLeft] = useState(130);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const toggleSound = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <div className="set3" style={{ position: "fixed", top: "18px", right: "120px", zIndex: 9999 }}>
      <input
        ref={sliderRef}
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => {
          const newVolume = parseFloat(e.target.value);
          setVolume(newVolume);
          if (audioRef.current) audioRef.current.volume = newVolume;

          if (sliderRef.current) {
            const slider = sliderRef.current;
            const sliderWidth = slider.offsetWidth;
            const thumbWidth = 40;
            const trackWidth = sliderWidth - thumbWidth;
            const thumbX = trackWidth * newVolume;
            setThumbLeft(thumbX);
          }
        }}
        disabled={isMuted}
        className={`volume-slider3 ${isMuted ? 'muted3' : ''}`}
      />
      <div className="thumb-label3" style={{ left: `${thumbLeft - -0}px` }}>
        {Math.round(volume * 100)}%
      </div>
      <button onClick={toggleSound}>{isMuted ? "🔇" : "🔊"}</button>
    </div>
  );
}

export default BgmControl;
