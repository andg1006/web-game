import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AutoButton from '../../button/AutoButton'; // ✅ 오토버튼 import 추가
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img3.css';

// 교무실 둘러보기

const dialogues = [
    { speaker: 'an', text: ' 역시 계단은 힘들다...' },
    { speaker: 'an', text: ' 여긴... 왜 이렇게 어두워?' },
    { speaker: 'choi', text: ' 멍청아... 밤이니까 어둡지...' },
    { speaker: 'an', text: ' 헤헷...' },
    { speaker: 'choi', text: ' 헤헷?' },
    { speaker: 'an', text: ' 미안...' },
    { speaker: 'choi', text: ' 그래, 일단 반을 가볼까?' },
    { speaker: 'an', text: ' 빨리 갔다가 나오자...' },
    { speaker: 'choi', text: ' ?!' },
    { speaker: 'choi2', text: ' 방금... 뭐였어?' },
    { speaker: 'an', text: ' 뭐라는 거야 무섭게...' },
    { speaker: 'choi', text: ' 방금 창문이...' },
    { speaker: 'an', text: ' 진짜 장난 치지마라...' },
    { speaker: 'choi', text: ' 쉼터쪽으로 가볼까..?' },
    { speaker: 'an', text: ' 아니 무섭게 왜 쉼터로 가 ㅠㅠ' },
    { speaker: 'an', text: ' 그냥 반이나 빨리 들리자고...' },
    { speaker: 'choi', text: ' 쉼터 창문으로 밖에 볼라고...' },
    { speaker: 'choi', text: ' 그럼 나는 쉼터 한 번 볼게, 너는 반 갔다 올래..?' },
    { speaker: 'an', text: ' 혼자 가는 거 싫어... 그냥 같이 가자...' },
];

function Page5() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
    const [showSceneText, setShowSceneText] = useState(false);
    const [showTxtBox, setShowTxtBox] = useState(false);
    const [bgClass, setBgClass] = useState('bg3-1'); // 기본 배경 클래스

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

            // ✅ 배경 전환 효과 (choi2 나오기 직전)
            if (currentIndex === 8) {
                setBgClass('bg3-1-flash');
                setTimeout(() => {
                    setBgClass('bg3-1');
                }, 750); // 0.5초 뒤 원래대로
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
            navigate('/web-game/page6');
        }
    };

    return (
        <div className={`page-container ${bgClass} ${fadeIn ? 'fade-in' : ''}`}>
            <Menu />
            {showSceneText && <div className="scene-text">- 3층 -</div>}

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

            <AutoButton isTypingDone={!typing} onAutoNext={handleClick} />
        </div>
    );
}

export default Page5;