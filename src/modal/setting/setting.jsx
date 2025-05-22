import { useState, useRef, useEffect } from "react";
import "./setting.css";

function Setting({ SettingOpen, SettingClose }) {
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false); // 유저 조작 여부
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0.5); // 초기 볼륨 값 상태 추가
    const sliderRef = useRef(null); // 슬라이더 DOM 접근용
    const [thumbLeft, setThumbLeft] = useState(130); // thumb 위치 상태

    useEffect(() => {
        const audio = new Audio(import.meta.env.BASE_URL + "sounds/home.mp3");
        audio.loop = true;
        audio.volume = 0.6;
        audio.muted = true;
        audioRef.current = audio;

        // ❌ 여기선 play() 안 함 → 브라우저가 막아!
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    const toggleSound = () => {
        if (audioRef.current) {
            // 처음 클릭한 경우 → play() 시도
            if (!hasInteracted) {
                audioRef.current.play().then(() => {
                    setHasInteracted(true);
                    audioRef.current.muted = false;
                    setIsMuted(false);
                }).catch((err) => {
                    console.log("❌ 재생 실패:", err);
                });
            } else {
                // 이미 재생 중이면 mute만 토글
                const newMuted = !isMuted;
                audioRef.current.muted = newMuted;
                setIsMuted(newMuted);
            }
        }
    };


    return (
        <>
            <div className='setting' style={{ display: SettingOpen ? "block" : "none" }}>
                <h1>설정</h1>
                <ul>
                    <li><p>사운드</p>
                        <div className="set">
                            <input ref={sliderRef} type="range" min="0" max="1" step="0.01" value={volume}
                                onChange={(e) => {
                                    const newVolume = parseFloat(e.target.value);
                                    setVolume(newVolume);

                                    if (audioRef.current) { audioRef.current.volume = newVolume; }
                                    // ⭐ 정확한 thumb 위치 계산
                                    if (sliderRef.current) {
                                        const slider = sliderRef.current;
                                        const sliderWidth = slider.offsetWidth;
                                        const thumbWidth = 40; // 너가 설정한 thumb 크기
                                        const trackWidth = sliderWidth - thumbWidth;
                                        const thumbX = trackWidth * newVolume;
                                        setThumbLeft(thumbX);
                                    }
                                }
                                }
                                disabled={isMuted}
                                className={`volume-slider ${isMuted ? 'muted' : ''}`}
                            />
                            <div className="thumb-label" style={{ left: `${thumbLeft - -177}px` }}>
                                {Math.round(volume * 100)}%
                            </div>
                            <button onClick={toggleSound}>{isMuted ? "🔇" : "🔊"}</button>
                        </div>
                    </li>
                </ul>
                <br />
                <button className="close" onClick={SettingClose}>닫기</button>
            </div>
        </>
    );
}

export default Setting;
