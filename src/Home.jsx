// Home.jsx
import { useNavigate } from 'react-router-dom';
import { useState, } from 'react';
import './Home.css';

import RankingBoard from './RankingBoard';
import Rule from './modal/rule/Rule';
import Setting_menu from './navbar/setting_menu';
import Start from './modal/start/start';
import Ranking from './modal/ranking/Ranking'; // ✅ import 추가

function Home() {
  const [isRuleOpen, setIsRuleOpen] = useState(false);
  const RuleOpen = () => setIsRuleOpen(true);
  const RuleClose = () => setIsRuleOpen(false);

  const navigate = useNavigate();
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isRankingOpen, setIsRankingOpen] = useState(false);

  const handleStartClick = () => {
    const savedPage = localStorage.getItem('prevPage');
    console.log('💾 저장된 페이지:', savedPage); // ✅ 콘솔 추가!
    if (savedPage) {
      setIsStartOpen(true);
    } else {
      navigate('/web-game/phone');
    }
  };

  const handleReturn = () => {
    const savedPage = localStorage.getItem('prevPage');
    if (savedPage) {
      navigate(savedPage);
      localStorage.removeItem('prevPage');
    }
  };

  return (
    <>
      <div className='main'>
        <div>
          <Rule RuleOpen={isRuleOpen} RuleClose={RuleClose} />
          <Setting_menu />
          <div className="container">
            <p>오후 9시</p>
            <ul className="menu">
              <li><button onClick={handleStartClick}>게임 시작</button></li>
              <li><button onClick={RuleOpen}>게임 설명</button></li>
              <li><button onClick={() => setIsRankingOpen(true)}>🏆 랭킹 보기</button></li>
            </ul>
          </div>
          <Ranking RankingOpen={isRankingOpen} RankingClose={() => setIsRankingOpen(false)}>
            <RankingBoard />
          </Ranking>
        </div>
        <Start
          StartOpen={isStartOpen}
          StartClose={() => setIsStartOpen(false)}
          onReturn={handleReturn}
        />
      </div>
    </>
  );
}

export default Home;
