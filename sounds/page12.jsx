import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AutoButton from '../../button/AutoButton'; // ✅ 오토버튼 import 추가
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img3.css';

// 교무실 둘러보기

const dialogues = [
    { speaker: 'an', text: ' 일단 여기까지 오면서 우리 반은 없었는데...' },
    { speaker: 'choi', text: ' 우리반은 어디에 있을까...' },
    { speaker: 'an', text: ' 지금 쉴 틈이 없다, 빠르게 끝까지 가서 확인하고 내려가자' },
    { speaker: '', text: ' ' },
    
    { speaker: 'all', text: ' 으아아악!!!!!!!' },
    { speaker: 'an2', text: ' 갑자기 문이... 저절로...' },
    { speaker: 'choi2', text: ' 빨리 도망을...' },
    { speaker: '???', text: ' 깜짝 놀랐네...' },
    { speaker: 'choi2', text: ' ...?' },
    { speaker: '???', text: ' 어? 동근아 태민아 너희 왜 여기있어?' },
    { speaker: 'choi2', text: ' 누...누구세요..?' },
    { speaker: 'kim', text: ' 나야, 민선이' },
    { speaker: 'an', text: ' 너가 왜 여기있어?' },
    { speaker: 'kim', text: ' 일단 들어와서 얘기하자, 얼른 들어와' },
    
];

function Page12() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
    const [showSceneText, setShowSceneText] = useState(false);
    const [showTxtBox, setShowTxtBox] = useState(false);
    const [bgClass, setBgClass] = useState('bg4-2'); // 기본 배경 클래스

    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [typing, setTyping] = useState(false);

    const [showChoices, setShowChoices] = useState(false); // 선택지 표시 여부

    const currentDialogue = dialogues[currentIndex];
    const speaker = currentDialogue?.speaker;
    const intervalRef = useRef(null);
    const location = useLocation();

    const playSfx = (filename) => {
        const sfx = new Audio(import.meta.env.BASE_URL + `sounds/${filename}`);
        sfx.volume = 0.6;
        sfx.play().catch((err) => console.warn('🎵 효과음 재생 실패:', err));
    };
    useEffect(() => {
        if (currentIndex === 4 - 1) {
            playSfx('open-door.mp3');
        }
        if (currentIndex === 5 - 1) {
            playSfx('Scream2.mp3');
            playSfx('Scream.mp3');
        }
    }, [currentIndex]);

    useEffect(() => {
        setTimeout(() => setFadeIn(true), 100);
        setTimeout(() => setShowSceneText(true), 1600);
        setTimeout(() => setShowSceneText(false), 3600);
        setTimeout(() => setShowTxtBox(true), 3700);
    }, []);

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
            if (currentIndex === 3) {
                setBgClass('bg4-2-1');
            }
            if (currentIndex === 9) {
                setBgClass('bg4-2-2');
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
        if (typing) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setDisplayText(currentDialogue.text);
            setTyping(false);
            return;
        }

        if (currentIndex < dialogues.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            navigate('/web-game/page13');
        }
    };

    return (
        <div className={`page-container ${bgClass} ${fadeIn ? 'fade-in' : ''}`}>
            <Menu />
            {showSceneText && <div className="scene-text">- 4층 중앙 계단 -</div>}

            <div className={`txt-box ${showTxtBox ? 'fade-in' : ''}`} onClick={handleClick}>
                <div className="left">
                    {!showChoices && (
                        <>
                            <img className='an' src={import.meta.env.BASE_URL + "images/an1.png"} style={{ display: speaker === 'an' ? 'block' : 'none' }} />
                            <img className='an' src={import.meta.env.BASE_URL + "images/an2.png"} style={{ display: speaker === 'an2' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/choi1.png"} style={{ display: speaker === 'choi' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/choi2.png"} style={{ display: speaker === 'choi2' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/.png"} style={{ display: speaker === '???' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/kim.png"} style={{ display: speaker === 'kim' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/all2.png"} style={{ display: speaker === 'all' ? 'block' : 'none' }} />
                        </>
                    )}
                </div>
                <div className="right">
                    <div className="top">
                        <h3 className='an' style={{ display: speaker === 'an' || speaker === 'an2' ? 'block' : 'none' }}>안동근</h3>
                        <h3 className='choi' style={{ display: speaker === 'choi' || speaker === 'choi2' ? 'block' : 'none' }}>최태민</h3>
                        <h3 className='choi' style={{ display: speaker === '???' ? 'block' : 'none' }}>???</h3>
                        <h3 className='choi' style={{ display: speaker === 'kim' ? 'block' : 'none' }}>김민선</h3>
                        <h3 className='choi' style={{ display: speaker === 'all' ? 'block' : 'none' }}>안동근 / 최태민</h3>
                    </div>
                    <div className="bottom">
                        <p className='an' style={{ display: speaker === 'an' || speaker === 'an2' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'choi' || speaker === 'choi2' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === '???' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'kim' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'all' ? 'block' : 'none' }}>{displayText}</p>
                    </div>
                </div>
            </div>

            <AutoButton isTypingDone={!typing} onAutoNext={handleClick} />
        </div>
    );
}

export default Page12;