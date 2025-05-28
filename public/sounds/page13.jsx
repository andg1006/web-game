import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AutoButton from '../../button/AutoButton'; // ✅ 오토버튼 import 추가
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img4.css';

// 교무실 둘러보기

const dialogues = [
    { speaker: 'choi', text: ' 그래서 여기 온 이유가 뭐라고?' },
    { speaker: 'kim', text: ' 나 학교에 놓고 온 물건이 있어서 왔지...' },
    { speaker: 'kim', text: ' 너희는 왜 여기있어?' },
    { speaker: 'choi', text: ' 우리도 놓고 온 물건이 있어서...' },
    { speaker: 'an', text: ' 근데 왜 너 여기 있어? 여기는 다른 반인데...' },
    { speaker: 'choi', text: ' 너도 설마 반이 바뀌어서 반 찾고있어?' },
    { speaker: 'kim', text: ' 어? 어떻게 알았어? 반 바뀌어서 찾고 있었는데...' },
    { speaker: 'kim', text: ' 갑자기 귀신이 나타나서 무서워서 일단 여기로 오긴 했는데' },
    { speaker: 'kim', text: ' 설마 너희도 귀신 봤어?' },
    { speaker: 'choi', text: ' 나는 봤는데 동근이는 못봤나봐' },
    { speaker: 'an', text: ' 일단 지금 여기 이상해... 괴이한 현상이 계속 일어나...' },
    { speaker: 'kim', text: ' 우리 얼른 반 찾아서 물건 챙기고 나가자' },
    { speaker: 'choi', text: ' 일단 4층 절반은 찾아 봤는데 없었어' },
    { speaker: 'kim', text: ' 그럼 4층 복도 끝쪽 확인하고 내려가면 되겠다' },
    { speaker: 'choi', text: ' 그래, 얼른...' },
    
    { speaker: 'all', text: ' ...!' },
    { speaker: '???', text: ' 이상하다.. 분명 소리가 들렸는데...' },
    { speaker: 'kim', text: ' 이제 간거같아...' },
    { speaker: 'all', text: ' 바...방금 뭐야...?' },
    { speaker: 'kim', text: ' 경비원이신가...' },
    { speaker: 'choi', text: ' 우리 학교에 경비가 있었나..?' },
    { speaker: 'an', text: ' 몰라 ㅠㅠ 얼른 반 찾아서 나가자 ㅠㅠ' },
    { speaker: 'kim', text: ' 내가 한 번 밖에 살펴볼게' },
    { speaker: 'kim', text: ' 오케이, 나와도 될 것같아' },
];

function Page12() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
    const [showSceneText, setShowSceneText] = useState(false);
    const [showTxtBox, setShowTxtBox] = useState(false);
    const [bgClass, setBgClass] = useState('bg4-3'); // 기본 배경 클래스

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
    const playSfx2 = (filename) => {
        const sfx = new Audio(import.meta.env.BASE_URL + `sounds/${filename}`);
        sfx.volume = 1;
        sfx.play().catch((err) => console.warn('🎵 효과음 재생 실패:', err));
    };
    useEffect(() => {
        if (currentIndex === 15 - 1) {
            playSfx('door-knock.mp3');
        }
        if (currentIndex === 16 - 1) {
            playSfx('open-door.mp3');
        }
        if (currentIndex === 17 - 1) {
            playSfx2('work.mp3');
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
            navigate('/web-game/page14');
        }
    };

    return (
        <div className={`page-container ${bgClass} ${fadeIn ? 'fade-in' : ''}`}>
            <Menu />
            {showSceneText && <div className="scene-text">- 4층 어느 반 -</div>}

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