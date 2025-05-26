import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Menu from '../navbar/menu';
import './css/phone.css';

function Phone() {
    const navigate = useNavigate();
    const location = useLocation();

    const audioRef = useRef(null); // 🔊 오디오 DOM 참조용

    const images = Array.from({ length: 17 }, (_, i) =>
        import.meta.env.BASE_URL + `phones/phone${i + 1}.png`
    );

    const [currentIndex, setCurrentIndex] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);
    const [showClickText, setShowClickText] = useState(false);

    const sliderRef = useRef(null);
    const [volume, setVolume] = useState(0.5);
    const [thumbLeft, setThumbLeft] = useState(130);
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            audio.currentTime = 0;
            audio.loop = true;
            audio.volume = volume;
            audio.muted = true;

            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // 👉 자동 재생 성공한 경우 → 자동으로 상태 반영!
                    setHasInteracted(true);
                    audio.muted = false;
                    setIsMuted(false);
                }).catch((err) => {
                    // 👉 자동 재생 실패한 경우 → 그대로 사용자 클릭 기다림
                    console.warn("자동 재생 차단됨:", err);
                });
            }
        }

        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, []);

    const toggleSound = () => {
        if (audioRef.current) {
            if (!hasInteracted) {
                audioRef.current.play().then(() => {
                    setHasInteracted(true);
                    audioRef.current.muted = false;
                    setIsMuted(false);
                }).catch((err) => {
                    console.log("❌ 재생 실패:", err);
                });
            } else {
                const newMuted = !isMuted;
                audioRef.current.muted = newMuted;
                setIsMuted(newMuted);
            }
        }
    };

    // ✅ 페이지 진입 시 음악 재생
    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            audio.currentTime = 0;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch((err) =>
                    console.warn("자동 재생이 차단되었을 수 있어요:", err)
                );
            }
        }

        // 페이지 벗어날 때 음악 정지
        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex(0);
            setFadeIn(false);
            setTimeout(() => setFadeIn(true), 50);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem('prevPage', location.pathname);
    }, []);

    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const handleImageLoad = () => {
        setTimeout(() => {
            setShowClickText(true);
        }, 500);
    };

    const handleClick = () => {
        if (!showClickText) return;

        // 🔊 효과음 재생
        const clickSfx = new Audio(import.meta.env.BASE_URL + 'sounds/kakao.mp3');
        clickSfx.volume = 1;
        clickSfx.play().catch((err) => {
            console.warn('클릭 사운드 재생 실패:', err);
        });

        if (currentIndex < images.length - 1) {
            const next = currentIndex + 1;
            setCurrentIndex(next);
            setFadeIn(false);
            setShowClickText(false);
            setTimeout(() => setFadeIn(true), 50);
        } else {
            navigate('/web-game/page1');
        }
    };

    const 스킵 = () => navigate('/web-game/page1');

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <Menu />

            {/* ✅ BGM 오디오 */}
            <audio
                ref={audioRef}
                src={import.meta.env.BASE_URL + 'sounds/kakao-bgm.mp3'}
                loop
            />

            {currentIndex !== null && (
                <img
                    src={images[currentIndex]}
                    alt={`phone-${currentIndex}`}
                    className={`phone-image ${fadeIn ? 'fade-in' : ''}`}
                    onClick={handleClick}
                    onLoad={handleImageLoad}
                />
            )}
            {showClickText && <p className="click-text">이미지를 클릭하세요!</p>}

            <button
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 10,
                    padding: '7.5px 12.5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    border: '3px solid white',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
                onClick={스킵}
            >
                스킵 ▶▶
            </button>

            <ul className='ddd'>
                <li><p>BGM</p>
                    <div className="set2" style={{ zIndex: 10 }}>
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
        
                                if (audioRef.current) {
                                    audioRef.current.volume = newVolume;
                                }
        
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
                            className={`volume-slider2 ${isMuted ? 'muted2' : ''}`}
                        />
                        <div className="thumb-label2" style={{ left: `${thumbLeft - -0}px` }}>
                            {Math.round(volume * 100)}%
                        </div>
                        <button onClick={toggleSound}>{isMuted ? "🔇" : "🔊"}</button>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Phone;
