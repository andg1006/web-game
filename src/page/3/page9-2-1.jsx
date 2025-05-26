import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AutoButton from '../../button/AutoButton'; // ✅ 오토버튼 import 추가
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img3.css';

import RankingModal from '../../modal/rank/RankingModal';
import { saveRanking } from '../../utils/saveRanking';

const dialogues = [
    { speaker: 'an', text: ' 어쩌다가 들어왔는데...' },
    { speaker: 'choi', text: ' 서랍이나 사물함을 보면...' },
    { speaker: 'choi', text: ' ...' },
    { speaker: 'an', text: ' 왜 우리 반 맞아?' },
    { speaker: 'choi2', text: ' 우리 반이 아니야... 진짜로 반이 옮겨졌나봐...' },
    { speaker: 'an2', text: ' 우리 빨리 여기 나가자...' },
    { speaker: 'all', text: ' ...' },
    { speaker: 'all', text: ' 으아아악!!!!!' },
    { speaker: 'sys', text: ' 안동근과 최태민은 너무 놀라 기절했다.' },

    { speaker: 't', text: ' 으악!!' },
    { speaker: 't', text: ' 너희 왜 바닥에 누워있어!!' },
];

function Page9_2_1() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
    const [showSceneText, setShowSceneText] = useState(false);
    const [bgClass, setBgClass] = useState('bg3-7'); // 기본 배경 클래스
    const [showTxtBox, setShowTxtBox] = useState(false);

    const [endSequence, setEndSequence] = useState(false); // 전체 화면 검정 전환
    const [showEndText, setShowEndText] = useState(false); // - END - 텍스트

    const [showChoices, setShowChoices] = useState(false); // 선택지 표시 여부

    const [showRankingModal, setShowRankingModal] = useState(false);
    const [finalScore] = useState(110); // 점수는 상황에 맞게 변경 가능

    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [typing, setTyping] = useState(false);

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
        localStorage.setItem('prevPage', '/web-game/page9');
    }, []);

    // 타이핑 효과
    useEffect(() => {
        if (showTxtBox && currentDialogue) {
            let i = 0;
            setDisplayText('');
            setTyping(true);

            if (currentIndex === 6) {
                setBgClass('bg3-7-1');
            }
            if (currentIndex === 11) {
                setBgClass('bg3-7-2');
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
                setTimeout(() => {
                    setShowRankingModal(true); // ✅ 랭킹 모달 등장
                }, 1500);
            }, 1500);
        }
    };

    return (
        <div className={`page-container ${bgClass} ${fadeIn ? 'fade-in' : ''}`}>
            {endSequence && (
                <div className="blackout">
                    {showEndText && <div className="end-text">- GAME OVER -</div>}
                </div>
            )}
            <Menu />
            {showSceneText && <div className="scene-text">- 교실 안 -</div>}

            <div className={`txt-box ${showTxtBox ? 'fade-in' : ''}`} onClick={handleClick}>
                <div className="left">
                    {!showChoices && (
                        <>
                            <img className='an' src={import.meta.env.BASE_URL + "images/an1.png"} style={{ display: speaker === 'an' ? 'block' : 'none' }} />
                            <img className='an' src={import.meta.env.BASE_URL + "images/an2.png"} style={{ display: speaker === 'an2' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/choi1.png"} style={{ display: speaker === 'choi' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/choi2.png"} style={{ display: speaker === 'choi2' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/all2.png"} style={{ display: speaker === 'all' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/.png"} style={{ display: speaker === 'sys' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/.png"} style={{ display: speaker === 't' ? 'block' : 'none' }} />
                        </>
                    )}
                </div>
                <div className="right">
                    <div className="top">
                        <h3 className='an' style={{ display: speaker === 'an' || speaker === 'an2' ? 'block' : 'none' }}>안동근</h3>
                        <h3 className='choi' style={{ display: speaker === 'choi' || speaker === 'choi2' ? 'block' : 'none' }}>최태민</h3>
                        <h3 className='choi' style={{ display: speaker === 'all' ? 'block' : 'none' }}>안동근 / 최태민</h3>
                        <h3 className='choi' style={{ display: speaker === 'sys' ? 'block' : 'none' }}></h3>
                        <h3 className='choi' style={{ display: speaker === 't' ? 'block' : 'none' }}>선생님</h3>
                    </div>
                    <div className="bottom">
                        <p className='an' style={{ display: speaker === 'an' || speaker === 'an2' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'choi' || speaker === 'choi2' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'all' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'sys' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 't' ? 'block' : 'none' }}>{displayText}</p>
                    </div>
                </div>
            </div>
            {showRankingModal && (
                <RankingModal
                    score={finalScore}
                    onRegister={(name) => {
                        saveRanking(name, finalScore);
                        navigate('/web-game/');
                    }}
                    onCancel={() => navigate('/web-game/')}
                />
            )}

            <AutoButton isTypingDone={!typing} onAutoNext={handleClick} />
        </div>
    );
}

export default Page9_2_1;