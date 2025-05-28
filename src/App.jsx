import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { createContext, useState, useRef, useEffect } from 'react';
import RankingModal from './modal/rank/RankingModal';
import { saveRanking } from './utils/saveRanking';

export const TimerContext = createContext();

import Home from './Home';
import In_development from './page/In-development';
import BgmPlayer from './BgmPlayer';
import BgmControl from './BgmControl';

import Phone from './page/phone';
import Page1 from './page/page1';
import Page2 from './page/page2';
import Page3 from './page/page3';

import Page4 from './page/2/page4';
import Page4_1 from './page/2/page4-1';
import Page4_2 from './page/2/page4-2';
import Page4_2_1 from './page/2/page4-2-1';
import Chapter1 from './page/2/chapter1';
import Chapter2 from './page/2/chapter2';
import Chapter3 from './page/2/chapter3';

import Page5 from './page/3/page5';
import Page6 from './page/3/page6';
import Page7 from './page/3/page7';
import Page8 from './page/3/page8';
import Page9 from './page/3/page9';
import Page9_2 from './page/3/page9-2';
import Page9_2_1 from './page/3/page9-2-1';
import Page10 from './page/3/page10';

import Page11 from './page/4/page11';
import Page12 from './page/4/page12';
import Page13 from './page/4/page13';
import Page14 from './page/4/page14';
import Page15 from './page/4/page15';
import Page16 from './page/4/page16';

function App() {
  const bgmPlayerRef = useRef();
  const location = useLocation();
  const navigate = useNavigate(); // ✅ 추가!

  const [showModal, setShowModal] = useState(false);
  const [finalScore] = useState(150); // 임시 점수

  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(() => {
    const saved = localStorage.getItem('elapsedTime');
    return saved ? Number(saved) : 0;
  });
  const [baseTime, setBaseTime] = useState(null);
  const timerRef = useRef(null);

  const [timerRunning, setTimerRunning] = useState(true); // ⬅️ 타이머 ON/OFF 제어 추가

  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    // 콘솔에서 activateDevMode() 호출하면 devMode가 true됨
    window.activateDevMode = () => {
      console.log('🛠 개발자 모드 활성화됨!');
      setDevMode(true);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/web-game/') {
      // 홈에서는 타이머 멈추고 초기화까지
      setTimerRunning(false);
      setElapsedTime(0); // ✅ 타이머 초기화!
      localStorage.removeItem('elapsedTime'); // ✅ 저장된 시간도 삭제!
      return;
    }

    // 다른 페이지에서는 타이머 작동
    const now = performance.now();
    setBaseTime(now);

    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => {
        const newElapsed = prev + (performance.now() - now);
        clearInterval(timerRef.current); // 타이머 새로 덮어쓰기 방지
        timerRef.current = setInterval(() => {
          setElapsedTime((prev2) => prev2 + 10);
        }, 10);
        return newElapsed;
      });
    }, 10);

    return () => clearInterval(timerRef.current);
  }, [location.pathname]);

  // ✅ 치트키 기능
  useEffect(() => {
    if (!devMode) return; // ❌ 개발자 모드가 아니라면 무시!

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case '1':
          navigate('/web-game/page4/chapter');
          break;
        case '2':
          navigate('/web-game/page2');
          break;
        case '3':
          navigate('/web-game/page3');
          break;
        case '4':
          navigate('/web-game/page4/chapter1');
          break;
        case '5':
          navigate('/web-game/page4/chapter1');
          break;
        case '6':
          navigate('/web-game/page4/page2');
          break;
        case '7':
          navigate('/web-game/page9-2-1');
          break;
        case '8':
          navigate('/web-game/page14');
          break;
        case '9':
          navigate('/web-game/page16');
          break;
        case '0':
          setShowModal(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [devMode, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // F5 또는 Ctrl+R 막기
      if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
        e.preventDefault();
        alert('새로고침은 사용할 수 없습니다!');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isHiddenPage =
    location.pathname === '/web-game/' || location.pathname.includes('/web-game/phone');

  return (
    <TimerContext.Provider value={{
      elapsedTime,
      setElapsedTime,
      timerRunning,
      setTimerRunning // ✅ 요거 추가!
    }}>
      <>
        <BgmPlayer ref={bgmPlayerRef} />

        <div style={{
          position: 'fixed',
          top: '100px',
          right: '30px',
          backgroundColor: 'white',
          color: 'black',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '14px',
          zIndex: 9999
        }}>
          ⏱ 경과 시간: {(elapsedTime / 1000).toFixed(2)}초
        </div>

        {!isHiddenPage && (
          <BgmControl
            audioRef={
              bgmPlayerRef.current?.getAudio
                ? { current: bgmPlayerRef.current.getAudio() }
                : { current: null }
            }
          />
        )}

        {showModal && (
          <RankingModal
            score={finalScore}
            onRegister={(name, overwrite = false) => {
              saveRanking(name, finalScore, overwrite);
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          />
        )}

        <Routes>
          {/* 이하 라우트 코드는 그대로 유지 */}
          <Route path="/web-game/" element={<Home />} />
          <Route path="/web-game/In-development" element={<In_development />} />

          <Route path="/web-game/phone" element={<Phone />} />
          <Route path="/web-game/page1" element={<Page1 />} />
          <Route path="/web-game/page2" element={<Page2 />} />
          <Route path="/web-game/page3" element={<Page3 />} />

          <Route path="/web-game/page4" element={<Page4 />} />
          <Route path="/web-game/page4/page1" element={<Page4_2 />} />
          <Route path="/web-game/page4/page2" element={<Page4_2_1 />} />
          <Route path="/web-game/page4/chapter" element={<Page4_1 />} />
          <Route path="/web-game/page4/chapter1" element={<Chapter1 />} />
          <Route path="/web-game/page4/chapter2" element={<Chapter2 />} />
          <Route path="/web-game/page4/chapter3" element={<Chapter3 />} />

          <Route path="/web-game/page5" element={<Page5 />} />
          <Route path="/web-game/page6" element={<Page6 />} />
          <Route path="/web-game/page7" element={<Page7 />} />
          <Route path="/web-game/page8" element={<Page8 />} />
          <Route path="/web-game/page9" element={<Page9 />} />
          <Route path="/web-game/page9-2" element={<Page9_2 />} />
          <Route path="/web-game/page9-2-1" element={<Page9_2_1 />} />
          <Route path="/web-game/page10" element={<Page10 />} />

          <Route path="/web-game/page11" element={<Page11 />} />
          <Route path="/web-game/page12" element={<Page12 />} />
          <Route path="/web-game/page13" element={<Page13 />} />
          <Route path="/web-game/page14" element={<Page14 />} />
          <Route path="/web-game/page15" element={<Page15 />} />
          <Route path="/web-game/page16" element={<Page16 />} />
        </Routes>
      </>
    </TimerContext.Provider>
  );
}

export default App;
