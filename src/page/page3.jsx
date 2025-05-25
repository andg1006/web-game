import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AutoButton from '../button/AutoButton'; // ✅ 오토버튼 import 추가
import Menu from '../navbar/menu';
import './css/page-def.css';
import './css/back-img.css';

const dialogues = [
    { speaker: 'an', text: ' (...?)' },
    { speaker: 'choi', text: ' 뭐해' },
    { speaker: 'an', text: ' 누가 있...' },
    { speaker: 'choi', text: ' 뭐가 있다고' },
    { speaker: 'choi', text: ' 그만 쳐다보고 빨리 와' },
    { speaker: 'an', text: ' 잘못 봤나...' },
];

function Page3() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
    const [bgClass, setBgClass] = useState('bg3'); // ✅ 배경 클래스 상태
    const [showSceneText, setShowSceneText] = useState(false);
    const [showTxtBox, setShowTxtBox] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [typing, setTyping] = useState(false);

    const currentDialogue = dialogues[currentIndex];
    const speaker = currentDialogue?.speaker;
    const intervalRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            setFadeIn(true); // 페이드인 시작
        }, 100);

        // ✅ 페이드인 끝난 후 0.5초 뒤에 배경 변경
        setTimeout(() => {
            setBgClass('bg3-after');
        }, 100 + 1500); // 페이드인 시간(2초 예상) + 0.5초
        // 혹은 정확히 fade-in css duration 고려해서 값 조정!
        
        setTimeout(() => setShowTxtBox(true), 0.001);
    }, []);

    useEffect(() => {
        localStorage.setItem('prevPage', location.pathname);
    }, []);

    useEffect(() => {
        if (showTxtBox && currentDialogue) {
            let i = 0;
            setDisplayText('');
            setTyping(true);

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
            navigate('/web-game/page4');
        }
    };

    return (
        <div className={`page-container ${bgClass} ${fadeIn ? 'fade-in' : ''}`}>
            <Menu />
            {showSceneText && <div className="scene-text">- 계단 -</div>}

            <div className={`txt-box ${showTxtBox ? 'fade-in' : ''}`} onClick={handleClick}>
                <div className="left">
                    <img className='an' src={import.meta.env.BASE_URL + "images/an1.png"} style={{ display: speaker === 'an' ? 'block' : 'none' }} />
                    <img className='choi' src={import.meta.env.BASE_URL + "images/choi1.png"} style={{ display: speaker === 'choi' ? 'block' : 'none' }} />
                </div>
                <div className="right">
                    <div className="top">
                        <h3 className='an' style={{ display: speaker === 'an' ? 'block' : 'none' }}>안동근</h3>
                        <h3 className='choi' style={{ display: speaker === 'choi' ? 'block' : 'none' }}>최태민</h3>
                    </div>
                    <div className="bottom">
                        <p className='an' style={{ display: speaker === 'an' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'choi' ? 'block' : 'none' }}>{displayText}</p>
                    </div>
                </div>
            </div>

            <AutoButton isTypingDone={!typing} onAutoNext={handleClick} />
        </div>
    );
}

export default Page3;