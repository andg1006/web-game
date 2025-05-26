import { useNavigate } from 'react-router-dom';
import './menu.css'

function Again({ AgainOpen, AgainClose }) {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/web-game/');
        alert('저장 완료!');
    };

    return (
        <>
            <div className="again" style={{ display: AgainOpen ? "block" : "none" }}>
                <h1>정말로 돌아가시겠습니까?</h1>
                <ul>
                    <li><button onClick={goToHome}>예</button></li>
                    <li><button onClick={AgainClose}>아니요</button></li>
                </ul>
            </div>
        </>
    )
}

export default Again;