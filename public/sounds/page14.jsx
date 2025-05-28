import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AutoButton from '../../button/AutoButton'; // ✅ 오토버튼 import 추가
import Menu from '../../navbar/menu';
import RankingModal from '../../modal/rank/RankingModal';
import '../css/page-def.css';
import '../css/back-img4.css';
import { saveRanking } from '../../utils/saveRanking';

// 교무실 둘러보기

const dialogues = [
    { speaker: 'an', text: ' 휴.. 다행히 갔나보네...' },
    { speaker: 'choi', text: ' (앞 뒤를 확인 하며) 지금 아무도 없을 때 얼른...' },
    { speaker: 'choi', text: ' 내가 잘못 봤나...?' },
    { speaker: 'choi', text: ' 뭐가 점점 다가오는...' },
    { speaker: 'choi2', text: ' 으아아악!!!!!!' },
    { speaker: 'choi2', text: ' 뒤돌아 보지 말고 도망쳐!!!' },
    { speaker: 'kim', text: ' 갑자기 도망치라니?' },
    { speaker: 'choi2', text: ' 얼른!!! 절대 뒤돌지마!!' },
    { speaker: 'an2', text: ' 뭔데...!!' },
];
const dialogues2 = [
    { speaker: 'an', text: ' 아무 것도 없구만...' },
    { speaker: 'an', text: ' 으아아악!!!!' },
];

function Page14() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
    const [showSceneText, setShowSceneText] = useState(false);
    const [showTxtBox, setShowTxtBox] = useState(false);
    const [bgClass, setBgClass] = useState('bg4-4'); // 기본 배경 클래스

    const [isLookingBack, setIsLookingBack] = useState(false); // 돌아보기 눌렀는지
    const [lookBackSpeaker, setLookBackSpeaker] = useState(null); // 돌아본 speaker
    const [showLookBackBtn, setShowLookBackBtn] = useState(false);

    const [endSequence, setEndSequence] = useState(false); // 전체 화면 검정 전환
    const [showEndText, setShowEndText] = useState(false); // - END - 텍스트

    const [showScaryImage, setShowScaryImage] = useState(false); // 이미지 표시 여부
    const [imageEffectDone, setImageEffectDone] = useState(false); // 이미지 연출 끝났는지
    const [delayNextDialogue, setDelayNextDialogue] = useState(false); // 클릭 후 delay

    const [showRankingModal, setShowRankingModal] = useState(false);
    const [finalScore] = useState(120); // 점수 시스템 연동 가능

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndex2, setCurrentIndex2] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [typing, setTyping] = useState(false);

    const handleSaveRanking = () => {
        if (playerName.trim() !== '') {
            saveRanking(playerName, finalScore); // ✅ 점수와 이름 저장
            navigate('/web-game'); // 저장 후 홈으로 이동
        }
    };

    const [showChoices, setShowChoices] = useState(false); // 선택지 표시 여부

    const currentDialogue = dialogues[currentIndex];
    const currentDialogue2 = dialogues2[currentIndex2];
    const speaker = isLookingBack
        ? lookBackSpeaker
        : currentDialogue?.speaker;
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
        }

        if (currentIndex2 === 2 - 1) {
            playSfx('Scream1.mp3');
        }
    }, [currentIndex, currentIndex2]);

    useEffect(() => {
        if (isLookingBack && currentIndex2 === 0 && !showScaryImage) {
            // 텍스트 출력 끝났을 때 실행
            if (!typing) {
                setShowScaryImage(true); // 이미지 보여주기 (페이드인)

                setTimeout(() => {
                    setShowScaryImage(false); // 페이드아웃 트리거
                    setTimeout(() => {
                        setImageEffectDone(true); // 연출 끝
                        setCurrentIndex2(1); // 다음 대사로 진행
                    }, 1000); // 페이드아웃 후
                }, 1500); // 이미지 보여주는 시간
            }
        }
    }, [typing, isLookingBack, currentIndex2]);

    useEffect(() => {
        if (currentIndex === 5) {
            setShowLookBackBtn(true); // 대사가 도달하면 버튼 표시 ON
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
        if (!showTxtBox) return;

        let i = 0;
        setDisplayText('');
        setTyping(true);

        // ✅ 현재 출력할 대사 선택 (dialogues vs dialogues2)
        const activeDialogue = isLookingBack ? dialogues2[currentIndex2] : currentDialogue;

        if (!activeDialogue) return;

        // ✅ 배경 전환도 isLookingBack 아닐 때만 작동
        if (!isLookingBack) {
            if (currentIndex === 1) {
                setBgClass('bg4-4-1');
                setTimeout(() => {
                    setBgClass('bg4-4');
                }, 1000);
            }
            if (currentIndex === 2) setBgClass('bg4-4-2');
            if (currentIndex === 3) setBgClass('bg4-4-3');
            if (currentIndex === 4) setBgClass('bg4-4-4');
            if (currentIndex === 6) setBgClass('bg4-4');
        }

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            if (i >= activeDialogue.text.length) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                setTyping(false);
                return;
            }
            setDisplayText(prev => prev + activeDialogue.text.charAt(i));
            i++;
        }, 100);

        return () => clearInterval(intervalRef.current);
    }, [currentIndex, currentIndex2, showTxtBox, isLookingBack]);

    const handleClick = () => {
        if (typing) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            const fullText = isLookingBack
                ? dialogues2[currentIndex2]?.text
                : currentDialogue?.text;

            setDisplayText(fullText);
            setTyping(false);
            return;
        }

        if (isLookingBack && currentIndex2 === 0 && !imageEffectDone) {
            return; // 연출 도중이면 클릭 무시
        }

        if (isLookingBack) {
            if (currentIndex2 < dialogues2.length - 1) {
                setCurrentIndex2(prev => prev + 1);
            } else {
                // ✅ 대사 다 끝났을 때 종료 연출 시작
                setEndSequence(true); // 화면 어둡게 전환

                setTimeout(() => {
                    setShowEndText(true); // - END - 문구 등장
                    setTimeout(() => {
                        setShowRankingModal(true);
                    }, 1500);
                }, 1500); // 어둡게 된 후 1.5초 뒤
            }
        } else {
            if (currentIndex < dialogues.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                navigate('/web-game/page15');
            }
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
            {showSceneText && <div className="scene-text">- 4층 왼쪽 복도 -</div>}

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

            {showLookBackBtn && !isLookingBack && (
                <button
                    onClick={() => {
                        setIsLookingBack(true);
                        setLookBackSpeaker(currentDialogue.speaker);
                        setCurrentIndex2(0);
                        setDisplayText('');
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '80px',
                        right: '30px',
                        zIndex: 10,
                        padding: '10px 20px',
                        fontSize: '18px',
                        backgroundColor: 'black',
                        color: 'white',
                        border: '2px solid white',
                        borderRadius: '10px',
                    }}
                >
                    돌아보기
                </button>
            )}
            {isLookingBack && (
                <img
                    src={import.meta.env.BASE_URL + 'back-images/4/sub-img.png'}
                    className={`scary-image ${showScaryImage ? 'fade-in' : 'fade-out'}`}
                    style={{
                        position: 'absolute',
                        zIndex: 99,
                    }}
                />
            )}

            {showRankingModal && (
                <RankingModal
                    score={finalScore}
                    onRegister={(name) => {
                        saveRanking(name, finalScore);  // ✅ Firebase에 저장!
                        navigate('/web-game/');
                    }}
                    onCancel={() => navigate('/web-game/')}
                />
            )}

            <AutoButton isTypingDone={!typing} onAutoNext={handleClick} />
        </div>
    );
}

export default Page14;