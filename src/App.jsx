import { Routes, Route } from 'react-router-dom';
import In_development from './page/In-development';

import Home from './Home';

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

// import Page11 from './page/4/page11';

function App() {
  return (
    <Routes>
      {/* 기타 */}
      <Route path="/web-game/" element={<Home />} /> {/* 메인 */}
      <Route path="/web-game/In-development" element={<In_development />} /> {/* 개발 중 */}

      {/* 챕터 1 */}
      <Route path="/web-game/phone" element={<Phone />} />
      <Route path="/web-game/page1" element={<Page1 />} />
      <Route path="/web-game/page2" element={<Page2 />} />
      <Route path="/web-game/page3" element={<Page3 />} />

      {/* 챕터 2 */}
      <Route path="/web-game/page4" element={<Page4 />} />
      <Route path="/web-game/page4/page1" element={<Page4_2 />} />
      <Route path="/web-game/page4/page2" element={<Page4_2_1 />} />
      <Route path="/web-game/page4/chapter" element={<Page4_1 />} />
      <Route path="/web-game/page4/chapter1" element={<Chapter1 />} />
      <Route path="/web-game/page4/chapter2" element={<Chapter2 />} />
      <Route path="/web-game/page4/chapter3" element={<Chapter3 />} />

      {/* 쳅터 3 */}
      <Route path="/web-game/page5" element={<Page5 />} />
      <Route path="/web-game/page6" element={<Page6 />} />
      <Route path="/web-game/page7" element={<Page7 />} />
      <Route path="/web-game/page8" element={<Page8 />} />
      <Route path="/web-game/page9" element={<Page9 />} />
      <Route path="/web-game/page9-2" element={<Page9_2 />} />
      <Route path="/web-game/page9-2-1" element={<Page9_2_1 />} />
      <Route path="/web-game/page10" element={<Page10 />} />

      {/* 쳅터 4 */}
      {/* <Route path="/web-game/page11" element={<Page11 />} /> */}

    </Routes>
  );
}

export default App; 