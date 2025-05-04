import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Menu from '../navbar/menu';
import './css/page-def.css';

const dialogues = [
    { speaker: 'choi', text: ' 원래 이 시간에 불이 켜져있었냐..?' },
    { speaker: 'an', text: ' 몰라?' },
    { speaker: 'choi', text: ' 야, 지금 몇시야?' },
    { speaker: 'an', text: ' 몰라?' },
    { speaker: 'choi', text: ' ...?' },
    { speaker: 'an', text: ' ...?' },
    { speaker: 'choi', text: ' 뭐만 하면 모른데, 미친거냐?' },
    { speaker: 'an', text: ' 모를 수도 있지..' },
    { speaker: 'an', text: ' 지금이... 9시네!' },
    { speaker: 'choi', text: ' 오키, 학교 불 켜져있을 때 빨리 들어갔다 오자' },
    { speaker: 'an', text: ' 야, 근데.. 너무 무서운거 아니야?' },
    { speaker: 'choi', text: ' 야ㅡㅡ 9시니까 무서워 보이는 거야' },
    { speaker: 'choi', text: ' 너 빨리 안오면 먼저 들어간다?' },
    { speaker: 'an', text: ' 아.. 같이가!!' },
];

function Page1() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
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
            // 마지막 대사 끝났을 때 page2로 이동!
            navigate('/web-game/page2');
        }
    };

    return (
        <div className={`page-container ${fadeIn ? 'fade-in' : ''}`}>
            <Menu />
            {showSceneText && <div className="scene-text">- 학교 앞 -</div>}

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
        </div>
    );
}

export default Page1;