import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Phone from './page/phone';
import Page1 from './page/page1';
import Page2 from './page/page2';
import Page3 from './page/page3';
import Page4 from './page/page4';
import Page4_1 from './page/sub-page/page4-1';
import Page4_2 from './page/sub-page/page4-2';

function App() {
  return (
    <Routes>
      <Route path="/web-game/" element={<Home />} />
      <Route path="/web-game/phone" element={<Phone />} />
      <Route path="/web-game/page1" element={<Page1 />} />
      <Route path="/web-game/page2" element={<Page2 />} />
      <Route path="/web-game/page3" element={<Page3 />} />
      <Route path="/web-game/page4" element={<Page4 />} />
      <Route path="/web-game/page4/chapter" element={<Page4_1 />} />
      <Route path="/web-game/page4/page1" element={<Page4_2 />} />
    </Routes>
  );
}

export default App;