import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AutoButton from '../../button/AutoButton'; // ✅ 오토버튼 import 추가
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img4.css';

// 교무실 둘러보기

const dialogues = [
    { speaker: 'an2', text: ' 어! 여기에 우리 반이 있어!!' },
    { speaker: 'choi2', text: ' 얼른 들어가자!' },
    { speaker: 'an2', text: ' 얼른 찾고 나가자!!' },
    { speaker: 'choi2', text: ' 찾았다!' },
    { speaker: 'an2', text: ' 얼른 나가자!' },
];

function Page15() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
    const [showSceneText, setShowSceneText] = useState(false);
    const [showTxtBox, setShowTxtBox] = useState(false);
    const [bgClass, setBgClass] = useState('bg4-5'); // 기본 배경 클래스

    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [typing, setTyping] = useState(false);

    const [showImageEffect, setShowImageEffect] = useState(false);
    const [imageEffectDone, setImageEffectDone] = useState(false);

    const [showChoices, setShowChoices] = useState(false); // 선택지 표시 여부

    const currentDialogue = dialogues[currentIndex];
    const speaker = currentDialogue?.speaker;
    const intervalRef = useRef(null);
    const location = useLocation();

    // const playSfx = (filename) => {
    //     const sfx = new Audio(import.meta.env.BASE_URL + `sounds/${filename}`);
    //     sfx.volume = 0.6;
    //     sfx.play().catch((err) => console.warn('🎵 효과음 재생 실패:', err));
    // };
    // useEffect(() => {
    //     if (currentIndex === 3 - 1) {
    //         playSfx('Scream2.mp3');
    //     }
    // }, [currentIndex]);

    useEffect(() => {
        setTimeout(() => setFadeIn(true), 100);
        setTimeout(() => setShowSceneText(true), 1600);
        setTimeout(() => setShowSceneText(false), 3600);
        setTimeout(() => setShowTxtBox(true), 3700);
    }, []);

    useEffect(() => {
        if (currentIndex === 3 && !imageEffectDone) {
            // '찾았다!' 전 단계에서 페이드 인/아웃 연출
            setShowImageEffect(true);
            setTimeout(() => {
                setShowImageEffect(false); // 페이드아웃
                setTimeout(() => {
                    setImageEffectDone(true); // 완료 상태
                    setCurrentIndex(prev => prev + 1); // 다음 대사로 이동
                }, 500); // 페이드아웃 시간
            }, 1000); // 페이드인 지속 시간
        }
    }, [currentIndex, imageEffectDone]);

    useEffect(() => {
        localStorage.setItem('prevPage', location.pathname);
    }, []);

    // 타이핑 효과
    useEffect(() => {
        if (showTxtBox && currentDialogue) {
            let i = 0;
            setDisplayText('');
            setTyping(true);

            // ✅ 배경 전환 효과 (choi2 나오기 직전)
            if (currentIndex === 2) {
                setBgClass('bg4-5-b');
            }

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            intervalRef.current = setInterval(() => {
                if (i >= currentDialogue.text.length) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setTyping(false);
                    return;
                }
                setDisplayText(prev => prev + currentDialogue.text.charAt(i));
                i++;
            }, 100);

            return () => clearInterval(intervalRef.current);
        }
    }, [currentIndex, showTxtBox]);

    const handleClick = () => {
        if (typing || showImageEffect) return;

        if (currentIndex < dialogues.length - 1) {
            if (currentIndex === 3 && !imageEffectDone) {
                // 이미지 연출 시작 → 대사 넘김은 위 useEffect에서 처리함
                return;
            }
            setCurrentIndex(prev => prev + 1);
        } else {
            navigate('/web-game/page16');
        }
    };

    return (
        <div className={`page-container ${bgClass} ${fadeIn ? 'fade-in' : ''}`}>
            <Menu />
            {showSceneText && <div className="scene-text">- 3층 왼쪽 복도 끝 -</div>}

            <div className={`txt-box ${showTxtBox ? 'fade-in' : ''}`} onClick={handleClick}>
                <div className="left">
                    {!showChoices && (
                        <>
                            <img className='an' src={import.meta.env.BASE_URL + "images/an1.png"} style={{ display: speaker === 'an' ? 'block' : 'none' }} />
                            <img className='an' src={import.meta.env.BASE_URL + "images/an2.png"} style={{ display: speaker === 'an2' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/choi1.png"} style={{ display: speaker === 'choi' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/choi2.png"} style={{ display: speaker === 'choi2' ? 'block' : 'none' }} />
                        </>
                    )}
                </div>
                <div className="right">
                    <div className="top">
                        <h3 className='an' style={{ display: speaker === 'an' || speaker === 'an2' ? 'block' : 'none' }}>안동근</h3>
                        <h3 className='choi' style={{ display: speaker === 'choi' || speaker === 'choi2' ? 'block' : 'none' }}>최태민</h3>
                    </div>
                    <div className="bottom">
                        <p className='an' style={{ display: speaker === 'an' || speaker === 'an2' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'choi' || speaker === 'choi2' ? 'block' : 'none' }}>{displayText}</p>
                    </div>
                </div>
            </div>

            {showImageEffect && (
                <img
                    src={import.meta.env.BASE_URL + 'back-images/4/sub-img2.png'} // 원하면 다른 이미지로 변경 가능!
                    className="fade-image"
                    alt="연출 이미지"
                />
            )}

            <AutoButton isTypingDone={!typing} onAutoNext={handleClick} />
        </div>
    );
}

export default Page15;