import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AutoButton from '../../button/AutoButton';
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img2.css';

// 1층 중앙현관

const dialogues = [
    { speaker: 'choi', text: '  저건 뭐지?' },
    { speaker: 'an', text: ' 종이가 있는데..?' },
    { speaker: 'an', text: ' 종이에 뭐라고 써있는지 볼까...?' },
    { speaker: 'sys', text: ' 종이를 클릭' },

    { speaker: 'an2', text: ' 으악!!' },
    { speaker: 'choi2', text: ' ㅈ..저게 뭐야...' },
    { speaker: 'an2', text: ' 우리 그냥 과제 버릴까..?' },
    { speaker: 'an2', text: ' 이거 너무 불안해서 더 못 가겠는데..' },
    { speaker: 'choi', text: ' 에이.. 아니야 누가 장난친거겠지..' },
    { speaker: 'choi', text: ' 얼른 반에 들리자, 같은 층이니까 금방 가잖아' },
];

function page7() {
    const navigate = useNavigate();

    const [fadeIn, setFadeIn] = useState(false);
    const [showSceneText, setShowSceneText] = useState(false);
    const [showTxtBox, setShowTxtBox] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [typing, setTyping] = useState(false);

    const [showClickTarget, setShowClickTarget] = useState(false);
    const [waitingForClick, setWaitingForClick] = useState(false);
    const [showImage, setShowImage] = useState(false); // 이미지 표시 여부
    const [showDialogue, setShowDialogue] = useState(false); // 대사 출력 여부

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

      useEffect(() => {
        if (!typing && currentIndex === 3) {
          console.log("✅ 대사 끝! 클릭 타겟 보여줘!");
          setWaitingForClick(true);
          setShowClickTarget(true);
        }
      }, [typing, currentIndex]);

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
    
        // 9번 대사까지만 자동 진행, 이후는 이미지 클릭 기다림
        if (currentIndex < 3) {
            setCurrentIndex(prev => prev + 1);
        } else if (currentIndex === 3 && !waitingForClick) {
            setWaitingForClick(true);
        } 
        // ✅ 10번 이후는 다시 클릭으로 진행 가능하게 만듦
        else if (currentIndex >= 4 && currentIndex < dialogues.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } 
        else if (currentIndex === dialogues.length - 1) {
            navigate('/web-game/page8');
        }
    };
    
    const handleBookClick = () => {
        if (!waitingForClick) return;
    
        setShowClickTarget(false); // 클릭 타겟 숨기고
        setShowImage(true); // 이미지 페이드인
        setWaitingForClick(false);
    
        // ⏱ 일정 시간 후 이미지 제거 + 대사 출력
        setTimeout(() => {
            setShowImage(false);
            setShowDialogue(true);
            setCurrentIndex(prev => prev + 1); // "찾았다!" 대사 출력
        }, 3000); // 2초 후 전환
    };

    return (
        <div className={`page-container bg3-3 ${fadeIn ? 'fade-in' : ''}`}>
            <Menu />
            {showSceneText && <div className="scene-text">- 출석부 책장 -</div>}

            <div className={`txt-box ${showTxtBox ? 'fade-in' : ''}`} onClick={handleClick}>
                <div className="left">
                    <img className='an' src={import.meta.env.BASE_URL + "images/an1.png"} style={{ display: speaker === 'an' ? 'block' : 'none' }} />
                    <img className='an' src={import.meta.env.BASE_URL + "images/an2.png"} style={{ display: speaker === 'an2' ? 'block' : 'none' }} />
                    <img className='choi' src={import.meta.env.BASE_URL + "images/choi1.png"} style={{ display: speaker === 'choi' ? 'block' : 'none' }} />
                    <img className='choi' src={import.meta.env.BASE_URL + "images/choi2.png"} style={{ display: speaker === 'choi2' ? 'block' : 'none' }} />
                    <img className='sys' src={import.meta.env.BASE_URL + "images/.png"} style={{ display: speaker === 'sys' ? 'block' : 'none' }} />
                </div>
                <div className="right">
                    <div className="top">
                        <h3 className='an' style={{ display: speaker === 'an' || speaker === 'an2' ? 'block' : 'none' }}>안동근</h3>
                        <h3 className='choi' style={{ display: speaker === 'choi' || speaker === 'choi2' ? 'block' : 'none' }}>최태민</h3>
                        <h3 className='sys' style={{ display: speaker === 'sys' ? 'block' : 'none' }}></h3>
                    </div>
                    <div className="bottom">
                        <p className='an' style={{ display: speaker === 'an' || speaker === 'an2' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'choi' || speaker === 'choi2' ? 'block' : 'none' }}>{displayText}</p>
                        <p className='sys' style={{ display: speaker === 'sys' ? 'block' : 'none' }}>{displayText}</p>
                    </div>
                </div>
            </div>
            {showClickTarget && (
                <div className="click-target-1" onClick={handleBookClick} />
            )}
            {showImage && <div className="blur-overlay"></div>}
            {showImage && (
                <img
                    src={import.meta.env.BASE_URL + "back-images/3/sub-img1.png"}
                    alt="종이"
                    className="found-image"
                />
            )}
            <AutoButton isTypingDone={!typing} onAutoNext={handleClick} />
        </div>
    );
}

export default page7;