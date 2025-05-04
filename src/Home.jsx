// Home.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Home.css';

import Rule from './modal/rule/Rule';
import Setting_menu from './navbar/setting_menu';
import Start from './modal/start/start';

function Home() {
  const [isRuleOpen, setIsRuleOpen] = useState(false);
  const RuleOpen = () => setIsRuleOpen(true);
  const RuleClose = () => setIsRuleOpen(false);

  const navigate = useNavigate();
  const [isStartOpen, setIsStartOpen] = useState(false);

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
      <div>
        <Rule RuleOpen={isRuleOpen} RuleClose={RuleClose} />
        <Setting_menu />
        <div className="container">
          <p>오후 9시</p>
          <ul className="menu">
            <li><button onClick={handleStartClick}>게임 시작</button></li>
            <li><button onClick={RuleOpen}>게임 설명</button></li>
          </ul>
        </div>
      </div>
      <Start
        StartOpen={isStartOpen}
        StartClose={() => setIsStartOpen(false)}
        onReturn={handleReturn}
      />
    </>
  );
}

export default Home;
