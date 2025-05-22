import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef, useMemo } from 'react';
import AutoButton from '../../button/AutoButton';
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img2.css';

// 교무실 둘러보기

const firstDialogues = [  // ← 기존 dialogues 이름을 바꿈!
    { speaker: 'an', text: ' 여기는 쌤 책상인 것 같은데, 이름이...' },
    { speaker: 'choi', text: ' 그러게, 어떤 쌤 자리일까?' },
    { speaker: 'an', text: ' 일단 그래도 찾기는 해볼까?' },
    { speaker: 'choi', text: ' 그래, 안 찾는 것보단 낫다' },
    { speaker: 'an', text: ' 음... 너가 봐도 안 보이는 것 같지?' },
    { speaker: 'choi', text: ' 어쩔 수 없지' },
    { speaker: 'choi', text: ' 다른 곳도 찾아보자' },
];

const secondDialogues = [
    { speaker: 'an', text: ' ...?' },
    { speaker: 'choi', text: ' ...?!' },
    { speaker: 'choi2', text: ' 왜 이런 게 여기에...' },
    { speaker: 'an', text: ' 일단 여긴 없으니까, 다른 곳이나 찾자...' },
    { speaker: 'choi', text: ' ㄱ... 그래...' },
    { speaker: 'egg', text: ' 가발이 왜 여기에...?' },
];

function Chapter3() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
    const [showSceneText, setShowSceneText] = useState(false);
    const [showTxtBox, setShowTxtBox] = useState(false);
    const [bgClass, setBgClass] = useState('bg2-3'); // 초기 배경 클래스
    const [showBox, setShowBox] = useState(true);
    const [showFirstBox, setShowFirstBox] = useState(true);
    const [showSecondBox, setShowSecondBox] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [hasFoundWig, setHasFoundWig] = useState(false); // ❗ 이렇게 시작해서

    const [displayText, setDisplayText] = useState('');
    const [typing, setTyping] = useState(false);

    const [firstIndex, setFirstIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(0);
    const [showChoices, setShowChoices] = useState(false);

    if (hasFoundWig === null) {
        return <div>로딩 중...</div>;
    }

    // 🔁 조건부로 대사 리스트와 인덱스를 안전하게 설정
    const isSecondDialogue = hasFoundWig;
    const currentDialogueList = isSecondDialogue ? secondDialogues : firstDialogues;
    const currentIndex = isSecondDialogue ? secondIndex : firstIndex;
    const setCurrentIndex = isSecondDialogue ? setSecondIndex : setFirstIndex;
    const currentDialogue = currentDialogueList[currentIndex];

    const intervalRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => setFadeIn(true), 100);
        setTimeout(() => setShowSceneText(true), 1600);
        setTimeout(() => setShowSceneText(false), 3600);
        setTimeout(() => setShowTxtBox(true), 3700);
    }, []);


    // ✅ 새로고침으로 wig 불러오면 secondIndex를 0으로 리셋
    useEffect(() => {
        const wigState = localStorage.getItem('foundWig');
        if (wigState === 'true') {
            setHasFoundWig(true);
            setSecondIndex(0); // ✅ 가발 대사 초기화
        } else {
            setHasFoundWig(false);
            setFirstIndex(0); // ✅ 일반 대사 초기화도 꼭 해줘야 함!
        }
    }, []);

    useEffect(() => {
        console.log("hasFoundWig 상태:", hasFoundWig);
        console.log("secondIndex 상태:", secondIndex);
    }, [hasFoundWig, secondIndex]);

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

        const isSecond = hasFoundWig;
        const index = isSecond ? secondIndex : firstIndex;
        const setIndex = isSecond ? setSecondIndex : setFirstIndex;
        const list = isSecond ? secondDialogues : firstDialogues;

        const isLast = index >= list.length - 1;

        if (!isLast) {
            setIndex(prev => prev + 1);
        } else {
            setShowImage(false); // 혹시 켜져있다면 꺼주고
            setShowChoices(true); // 무조건 선택지 보여주기!
        }
    };

    useEffect(() => {
        if (showImage) {
            const timer = setTimeout(() => {
                setShowImage(false);
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [showImage]);

    const 담임쌤 = () => navigate('/web-game/page4/chapter1');
    const 출석부 = () => navigate('/web-game/page4/chapter2');

    return (
        <div className={`page-container ${bgClass} ${fadeIn ? 'fade-in' : ''}`}>
            <Menu />
            {showSceneText && <div className="scene-text">- ???쌤 책상 -</div>}

            <div
                className={`txt-box ${showTxtBox ? 'fade-in' : ''}`}
                onClick={handleClick}
            >
                {!showChoices ? (
                    <>
                        <div className="left">
                            <img className='an' src={import.meta.env.BASE_URL + "images/an1.png"} style={{ display: currentDialogue.speaker === 'an' ? 'block' : 'none' }} />
                            <img className='an' src={import.meta.env.BASE_URL + "images/an2.png"} style={{ display: currentDialogue.speaker === 'an2' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/choi1.png"} style={{ display: currentDialogue.speaker === 'choi' ? 'block' : 'none' }} />
                            <img className='choi' src={import.meta.env.BASE_URL + "images/choi2.png"} style={{ display: currentDialogue.speaker === 'choi2' ? 'block' : 'none' }} />
                        </div>
                        <div className="right">
                            <div className="top">
                                <h3 className='an' style={{ display: currentDialogue.speaker === 'an' || currentDialogue.speaker === 'an2' ? 'block' : 'none' }}>안동근</h3>
                                <h3 className='choi' style={{ display: currentDialogue.speaker === 'choi' || currentDialogue.speaker === 'choi2' ? 'block' : 'none' }}>최태민</h3>
                                <h3 className='egg' style={{ display: currentDialogue.speaker === 'egg' ? 'block' : 'none' }}>이스터에그</h3>
                            </div>
                            <div className="bottom">
                                <p className='an' style={{ display: currentDialogue.speaker === 'an' || currentDialogue.speaker === 'an2' ? 'block' : 'none' }}>{displayText}</p>
                                <p className='choi' style={{ display: currentDialogue.speaker === 'choi' || currentDialogue.speaker === 'choi2' ? 'block' : 'none' }}>{displayText}</p>
                                <p className='egg' style={{ display: currentDialogue.speaker === 'egg' ? 'block' : 'none' }}>{displayText}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="choice-container">
                        <button className="choice-btn" onClick={담임쌤}>담임쌤 자리를 탐색한다.</button>
                        <button className="choice-btn" onClick={출석부}>출석부 책장을 탐색한다.</button>
                    </div>
                )}
            </div>
            {showBox && !showChoices && !hasFoundWig && (
                <div className="click-target2" onClick={() => {
                    setShowBox(false);
                    setBgClass('bg2-3b2');
                    setShowFirstBox(false);
                    setShowSecondBox(true);
                }} />
            )}

            {showSecondBox && !hasFoundWig && (
                <div className="click-target3" onClick={() => {
                    setShowSecondBox(false);
                    setShowImage(true);
                    setHasFoundWig(true);
                    localStorage.setItem('foundWig', 'true');
                    setBgClass('bg2-3b');
                    setSecondIndex(0);
                }} />
            )}
            {showImage && (
                <img
                    src={import.meta.env.BASE_URL + "back-images/2/sub-bg2.png"}
                    alt="가발"
                    className="found-image"
                />
            )}
            <AutoButton isTypingDone={!typing} onAutoNext={handleClick} />
        </div>
    );
}

export default Chapter3;