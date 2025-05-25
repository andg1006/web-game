import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AutoButton from '../../button/AutoButton'; // ✅ 오토버튼 import 추가
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img.css';

const dialogues = [
    { speaker: 'an2', text: ' 헉...헉...' },
    { speaker: 'choi2', text: ' 헉... 헉... 야 갑자기 왜 뛰어..!' },
    { speaker: 'an2', text: ' 나 더이상 학교에 못있겠어...' },
    { speaker: 'an2', text: ' 아까부터 뭐가 보이질 않나, 방금 창문도...!' },
    { speaker: 'choi2', text: ' . . .' },
    { speaker: 'choi2', text: ' 그러면 과제는...' },
    { speaker: 'an2', text: ' 지금 과제가 중요해??' },
    { speaker: 'an2', text: ' 일단 나는 다시 집 갈거니까 내일 보자...' },
    { speaker: 'choi2', text: ' 그래.. 내일.. 보자...' },
    { speaker: 'choi', text: ' 하...' },
    { speaker: 'choi2', text: ' ...?!!' },
    { speaker: 'choi2', text: ' 왜 교무실에 불이... 아까는 꺼져있었..는..' },
    { speaker: 'choi2', text: ' 으아아악!!!!!' },

    { speaker: '???', text: ' 선생님, 동근이랑 태민이는 왜 안와요?' },
    { speaker: 't', text: ' 동근이랑 태민이는 당분간 못올거야.' },
];

function Page4_2_1() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
    const [showSceneText, setShowSceneText] = useState(false);
    const [bgClass, setBgClass] = useState('bg1'); // 기본 배경 클래스
    const [showTxtBox, setShowTxtBox] = useState(false);

    const [endSequence, setEndSequence] = useState(false); // 전체 화면 검정 전환
    const [showEndText, setShowEndText] = useState(false); // - END - 텍스트

    const [showChoices, setShowChoices] = useState(false); // 선택지 표시 여부

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

            if (currentIndex === 13) {
                setBgClass('');
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
            // ✅ 대사 다 끝났을 때 종료 연출 시작
            setEndSequence(true); // 화면 어둡게 전환

            setTimeout(() => {
                setShowEndText(true); // - END - 문구 등장
            }, 1500); // 어둡게 된 후 1.5초 뒤

            setTimeout(() => {
                navigate('/web-game'); // 홈으로 이동
            }, 6000); // - END - 등장 후 2초 뒤
        }
    };

    return (
        <div className={`page-container ${bgClass} ${fadeIn ? 'fade-in' : ''}`}>
            {endSequence && (
                <div className="blackout">
                    {showEndText && <div className="end-text">- END -</div>}
                </div>
            )}
            <Menu />
            {showSceneText && <div className="scene-text">- 학교 앞 -</div>}

            <div className={`txt-box ${showTxtBox ? 'fade-in' : ''}`} onClick={handleClick}>
                <div className="left">
                    {!showChoices && (
                        <>
                            <img className='an' src={import.meta.env.BASE_URL + "images/an1.png"} style={{ display: speaker === 'an' ? 'block' : 'none' }} />
                            <img className='an' src={import.meta.env.BASE_URL + "images/an2.png"} style={{ display: speaker === 'an2' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/choi1.png"} style={{ display: speaker === 'choi' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/choi2.png"} style={{ display: speaker === 'choi2' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/.png"} style={{ display: speaker === '???' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/.png"} style={{ display: speaker === 't' ? 'block' : 'none' }} />
                        </>
                    )}
                </div>
                <div className="right">
                    <div className="top">
                        <h3 className='an' style={{ display: speaker === 'an' || speaker === 'an2' ? 'block' : 'none' }}>안동근</h3>
                        <h3 className='choi' style={{ display: speaker === 'choi' || speaker === 'choi2' ? 'block' : 'none' }}>최태민</h3>
                        <h3 className='choi' style={{ display: speaker === '???' ? 'block' : 'none' }}>???</h3>
                        <h3 className='choi' style={{ display: speaker === 't' ? 'block' : 'none' }}>선생님</h3>
                    </div>
                    <div className="bottom">
                        <p className='an' style={{ display: speaker === 'an' || speaker === 'an2' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'choi' || speaker === 'choi2' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === '???' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 't' ? 'block' : 'none', color: 'red' }}>{displayText}</p>
                    </div>
                </div>
            </div>
            <AutoButton isTypingDone={!typing} onAutoNext={handleClick} />
        </div>
    );
}

export default Page4_2_1;