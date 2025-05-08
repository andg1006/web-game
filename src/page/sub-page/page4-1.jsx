import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img.css';

// 교무실 둘러보기

const dialogues = [
    { speaker: 'an', text: ' 일단 들어오긴 했는데...' },
    { speaker: 'choi', text: ' 너무 어두운데?' },
    { speaker: 'an', text: ' 야 손전등 좀 켜봐' },
    { speaker: 'choi', text: ' 너가 좀 켜면 안 돼?' },
    { speaker: 'an', text: ' 그건 난 모르겠고~' },
    { speaker: 'choi', text: ' 저 못돼먹은 거 봐라' },
    { speaker: 'choi', text: ' 이제 잘 보이냐?' },
    { speaker: 'an', text: ' 매우 만족합니다!' },
    { speaker: 'choi', text: ' 어휴... 어디부터 찾을래?' },
];

function Page4_1() {
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

    const 담임쌤 = () => navigate('/web-game/page4/chapter1');
    const 출석부 = () => navigate('/web-game/page4/chapter2');
    const ㅇㅇ쌤 = () => navigate('/web-game/page4/chapter3');

    return (
        <div className={`page-container bg4 ${fadeIn ? 'fade-in' : ''}`}>
            <Menu />
            {showSceneText && <div className="scene-text">- 교무실 -</div>}

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
                            <button className="choice-btn" onClick={담임쌤}>담임쌤 자리를 탐색한다.</button>
                            <button className="choice-btn" onClick={출석부}>출석부 책상을 탐색한다.</button>
                            <button className="choice-btn" onClick={ㅇㅇ쌤}>???쌤 자리를 탐색한다.</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page4_1;