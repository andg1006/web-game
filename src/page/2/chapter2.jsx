import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Menu from '../../navbar/menu';
import '../css/page-def.css';
import '../css/back-img2.css';

// 1층 중앙현관

const dialogues = [
    { speaker: 'an', text: ' 출석부 책장에 있지 않을까?' },
    { speaker: 'choi', text: ' 음... 어디보자...' },
    { speaker: 'an', text: ' 어두워서 잘 안보이는데...' },
    { speaker: 'choi', text: ' 내가 핸드폰을...' },
    { speaker: 'choi', text: ' 어? 핸드폰이 안켜져' },
    { speaker: 'an', text: ' 장난하지마라 ㅡㅡ' },
    { speaker: 'choi', text: ' 배터리가 없어서 전원이 안켜지나...' },
    { speaker: 'an', text: ' 어째서 우리에게 이런 시련을...' },
    { speaker: 'an', text: ' 어쩔 수 없다, 어둡지만 그냥 찾아야지...' },
    { speaker: 'choi', text: ' 그래 얼른 찾고 나가자' }, // 이 대사가 끝난 후 이미지의 어느 부분을 클릭하기 전까지 이 대사가 고정
    // 이미지의 어느 부분을 클릭하여 출석부를 찾았을 떄 나오는 대사
    { speaker: 'an', text: ' 찾았다!' },
    { speaker: 'choi', text: ' 오 나이스' },
    { speaker: 'an', text: ' 열쇠 찾았으니까 얼른 나가자' },
];

function Chapter2() {
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
        if (!typing && currentIndex === 9) {
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
        if (currentIndex < 9) {
            setCurrentIndex(prev => prev + 1);
        } else if (currentIndex === 9 && !waitingForClick) {
            setWaitingForClick(true);
        } 
        // ✅ 10번 이후는 다시 클릭으로 진행 가능하게 만듦
        else if (currentIndex >= 10 && currentIndex < dialogues.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } 
        else if (currentIndex === dialogues.length - 1) {
            navigate('/web-game/In-development');
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
        <div className={`page-container bg2-4 ${fadeIn ? 'fade-in' : ''}`}>
            <Menu />
            {showSceneText && <div className="scene-text">- 출석부 책장 -</div>}

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
                        <p className='an' style={{ display: speaker === 'an'  ? 'block' : 'none' }}>{displayText}</p>
                        <p className='choi' style={{ display: speaker === 'choi' ? 'block' : 'none' }}>{displayText}</p>
                    </div>
                </div>
            </div>
            {showClickTarget && (
                <div className="click-target" onClick={handleBookClick} />
            )}
            {showImage && <div className="blur-overlay"></div>}
            {showImage && (
                <img
                    src={import.meta.env.BASE_URL + "back-images/2/sub-bg.png"}
                    alt="출석부"
                    className="found-image"
                />
            )}
        </div>
    );
}

export default Chapter2;