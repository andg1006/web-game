import { useNavigate } from 'react-router-dom';
import './start.css';

function Start({ StartOpen, StartClose, onReturn }) {
    const navigate = useNavigate();
    const savedPage = localStorage.getItem('prevPage');

    const goToPage1 = () => {
        localStorage.removeItem('prevPage');
        navigate('/web-game/phone');
    };

    return (
        <div className="start" style={{ display: StartOpen ? 'block' : 'none' }}>
            <h1>처음부터 시작하시겠습니까?</h1>
            <h2>
                {savedPage
                    ? `저장된 페이지 : ${savedPage.replace('/', '')}`
                    : '저장된 페이지 없음'}
            </h2>
            <ul>
                <li><button onClick={goToPage1}>처음부터</button></li>
                <li><button onClick={onReturn}>저장 불러오기</button></li>
            </ul>
            <button className='close-start' onClick={StartClose}>닫기</button>
        </div>
    );
}

export default Start;
