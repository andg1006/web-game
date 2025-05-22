import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AutoButton from '../../button/AutoButton';
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img2.css';

// 교무실 둘러보기

const dialogues = [
    { speaker: 'an', text: ' 여기가 우리 담임쌤 자리 맞지?' },
    { speaker: 'choi', text: ' 어, 맞는 것 같다' },
    { speaker: 'an', text: ' 좋아, 함 찾아볼까?' },
    { speaker: 'choi', text: ' 음... 없는 것 같지?' },
    { speaker: 'an', text: ' 없는 것 같네, 찾는데 생각보다 오래걸리네' },
    { speaker: 'choi', text: ' 그냥 힘만 빠졌잖아...' },
    { speaker: 'an', text: ' 일단 다른 곳도 찾아보자' },
];

function Chapter1() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
    const [showSceneText, setShowSceneText] = useState(false);
    const [showTxtBox, setShowTxtBox] = useState(false);
    const [bgClass, setBgClass] = useState('bg2-3'); // 초기 배경 클래스
    const [showBox, setShowBox] = useState(true);


    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [typing, setTyping] = useState(false);

    const [showChoices, setShowChoices] = useState(false); // 선택지 표시 여부

    const currentDialogue = dialogues[currentIndex];
    const speaker = currentDialogue?.speaker;
    const intervalRef = useRef(null);
    const location = useLocation();

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

            // 기존 interval 제거 (혹시 모를 중복 방지)
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
            setShowChoices(true); // 대화 끝나면 선택지 보이기!
        }
    };

    const 출석부 = () => navigate('/web-game/page4/chapter2');
    const ㅇㅇ쌤 = () => navigate('/web-game/page4/chapter3');

    return (
        <div className={`page-container ${bgClass} ${fadeIn ? 'fade-in' : ''}`}>
            <Menu />
            {showSceneText && <div className="scene-text">- 담임쌤 책상 -</div>}

            <div className={`txt-box ${showTxtBox ? 'fade-in' : ''}`} onClick={handleClick}>
                <div className="left">
                    {!showChoices && (
                        <>
                            <img className='an' src={import.meta.env.BASE_URL + "images/an1.png"} style={{ display: speaker === 'an' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/choi1.png"} style={{ display: speaker === 'choi' ? 'block' : 'none' }} />
                        </>
                    )}
                </div>
                <div className="right">
                    {!showChoices ? (
                        <>
                            <div className="top">
                                <h3 className='an' style={{ display: speaker === 'an' ? 'block' : 'none' }}>안동근</h3>
                                <h3 className='choi' style={{ display: speaker === 'choi' ? 'block' : 'none' }}>최태민</h3>
                            </div>
                            <div className="bottom">
                                <p className='an' style={{ display: speaker === 'an' ? 'block' : 'none' }}>{displayText}</p>
                                <p className='choi' style={{ display: speaker === 'choi' ? 'block' : 'none' }}>{displayText}</p>
                            </div>
                        </>
                    ) : (
                        <div className="choice-container">
                            <button className="choice-btn" onClick={출석부}>출석부 책장을 탐색한다.</button>
                            <button className="choice-btn" onClick={ㅇㅇ쌤}>???쌤 자리를 탐색한다.</button>
                        </div>
                    )}
                </div>
            </div>
            {showBox && (
                <div className="click-target2" onClick={() => {
                    setShowBox(false)
                    setBgClass('bg2-3b')
                }} />
            )}
            <AutoButton isTypingDone={!typing} onAutoNext={handleClick} />
        </div>
    );
}

export default Chapter1;