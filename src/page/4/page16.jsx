import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef, useContext, useMemo } from 'react';
import AutoButton from '../../button/AutoButton';
import { TimerContext } from '../../App'; // ✅ 컨텍스트 가져와
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img4.css';

import RankingModal from '../../modal/rank/RankingModal';
import { saveRanking } from '../../utils/saveRanking';

const dialogues = [
    { speaker: 'an2', text: ' 헉... 헉...' },
    { speaker: 'choi2', text: ' 헉... 헉...' },
    { speaker: 'an2', text: ' 지금 몇시지...' },
    { speaker: 'choi2', text: ' 야... 교무실 불이 왜 켜져있어..?' },
    { speaker: 'an2', text: ' 지금 9시인데...?' },
    { speaker: 'all', text: ' 으아아악!!' },
];

function Page9_2_1() {
    const navigate = useNavigate();
    const location = useLocation();

    const [fadeIn, setFadeIn] = useState(false);
    const [showSceneText, setShowSceneText] = useState(false);
    const [bgClass, setBgClass] = useState('bg4-6');
    const [showTxtBox, setShowTxtBox] = useState(false);
    const [endSequence, setEndSequence] = useState(false);
    const [showEndText, setShowEndText] = useState(false);
    const [showRankingModal, setShowRankingModal] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [typing, setTyping] = useState(false);

    const intervalRef = useRef(null);
    const currentDialogue = dialogues[currentIndex];
    const speaker = currentDialogue?.speaker;

    // ✅ App에서 공유한 시간 가져오기
    const { elapsedTime, setTimerRunning } = useContext(TimerContext);

    // ✅ 점수 계산 함수
    const stopTime = (elapsedTime) => {
        const totalSeconds = elapsedTime / 1000;
        let score = 10000;

        if (totalSeconds < 60) {
            score -= totalSeconds * 50;
        } else if (totalSeconds < 180) {
            score -= 3000 + (totalSeconds - 60) * 10;
        } else {
            score -= 4200 + (totalSeconds - 180) * 2;
        }

        return Math.max(0, Math.floor(score));
    };

    // ✅ 점수는 한 번만 계산되도록 useMemo 사용
    const [finalScore, setFinalScore] = useState(null);

    const playSfx = (filename) => {
        const sfx = new Audio(import.meta.env.BASE_URL + `sounds/${filename}`);
        sfx.volume = 0.6;
        sfx.play().catch((err) => console.warn('🎵 효과음 재생 실패:', err));
    };

    useEffect(() => {
        if (currentIndex === dialogues.length - 1) {
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

    // 타이핑 효과
    useEffect(() => {
        if (showTxtBox && currentDialogue) {
            let i = 0;
            setDisplayText('');
            setTyping(true);
            clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                if (i >= currentDialogue.text.length) {
                    clearInterval(intervalRef.current);
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
            clearInterval(intervalRef.current);
            setDisplayText(currentDialogue.text);
            setTyping(false);
            return;
        }

        if (currentIndex < dialogues.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // 종료 연출
            setEndSequence(true);
            setTimeout(() => {
                setShowEndText(true);

                setTimerRunning(false); // ✅ 타이머 멈추기!!!

                setTimeout(() => {
                    const score = stopTime(elapsedTime);
                    setFinalScore(score);
                    setShowRankingModal(true);
                }, 1500);
            }, 1500);
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
                    <>
                        <img className='an' src={import.meta.env.BASE_URL + "images/an1.png"} style={{ display: speaker === 'an' ? 'block' : 'none' }} />
                        <img className='an' src={import.meta.env.BASE_URL + "images/an2.png"} style={{ display: speaker === 'an2' ? 'block' : 'none' }} />
                        <img className='choi' src={import.meta.env.BASE_URL + "images/choi1.png"} style={{ display: speaker === 'choi' ? 'block' : 'none' }} />
                        <img className='choi' src={import.meta.env.BASE_URL + "images/choi2.png"} style={{ display: speaker === 'choi2' ? 'block' : 'none' }} />
                        <img className='choi' src={import.meta.env.BASE_URL + "images/all2.png"} style={{ display: speaker === 'all' ? 'block' : 'none' }} />
                    </>
                </div>
                <div className="right">
                    <div className="top">
                        <h3 className='an' style={{ display: speaker === 'an' || speaker === 'an2' ? 'block' : 'none' }}>안동근</h3>
                        <h3 className='choi' style={{ display: speaker === 'choi' || speaker === 'choi2' ? 'block' : 'none' }}>최태민</h3>
                        <h3 className='choi' style={{ display: speaker === 'all' ? 'block' : 'none' }}>안동근 / 최태민</h3>
                    </div>
                    <div className="bottom">
                        <p className='an' style={{ display: speaker === 'an' || speaker === 'an2' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'choi' || speaker === 'choi2' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'all' ? 'block' : 'none' }}>{displayText}</p>
                    </div>
                </div>
            </div>

            {showRankingModal && finalScore !== null && (
                <RankingModal
                    score={finalScore}
                    onRegister={(name, overwrite = false) => {
                        saveRanking(name, finalScore, overwrite);
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
