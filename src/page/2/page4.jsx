import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AutoButton from '../../button/AutoButton';
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img2.css';

// 2층 교무실

const dialogues = [
    { speaker: 'choi', text: ' 야 아까 교무실 불 켜져 있지 않았어..?' },
    { speaker: 'an', text: ' 뭐래, 이 시간에 왜 불이 켜져 있어' },
    { speaker: 'an', text: ' 잘 못 본 거 아니야?' },
    { speaker: 'choi', text: ' 아니야 아까 불 켜져 있었는데...' },
    { speaker: 'an', text: ' 그건 모르겠고 일단 우리 열쇠 가져갈래?' },
    { speaker: 'choi', text: ' 그냥 카드로 문 따면 안 돼?' },
    { speaker: 'an', text: ' 뭔 카드로 문을...' },
];

function Page4() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
    const [showSceneText, setShowSceneText] = useState(false);
    const [showTxtBox, setShowTxtBox] = useState(false);

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

    const 교무실 = () => navigate('/web-game/page4/chapter');
    const 다음층으로 = () => navigate('/web-game/page4/page1');

    return (
        <div className={`page-container bg2-1 ${fadeIn ? 'fade-in' : ''}`}>
            <Menu />
            {showSceneText && <div className="scene-text">- 2층 교무실 앞 -</div>}

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
                            <button className="choice-btn" onClick={교무실}>교무실에 들어간다.</button>
                            <button className="choice-btn" onClick={다음층으로}>3층으로 올라간다.</button>
                        </div>
                    )}
                </div>
            </div>
            <AutoButton isTypingDone={!typing} onAutoNext={handleClick} />
        </div>
    );
}

export default Page4;