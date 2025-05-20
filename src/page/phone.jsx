import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Menu from '../navbar/menu';
import './css/phone.css';

function Phone() {
    const navigate = useNavigate();
    const location = useLocation();

    const images = Array.from({ length: 17 }, (_, i) =>
        import.meta.env.BASE_URL + `phones/phone${i + 1}.png`
    );

    const [currentIndex, setCurrentIndex] = useState(null); // null일 때는 아무 이미지도 안보여줌
    const [fadeIn, setFadeIn] = useState(false);
    const [showClickText, setShowClickText] = useState(false);

    // 첫 이미지 1.5초 뒤에 보여주기
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex(0);
            setFadeIn(false);
            setTimeout(() => setFadeIn(true), 50); // fade-in 적용
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem('prevPage', location.pathname);
    }, []);

    useEffect(() => {
        images.forEach((src) => {
          const img = new Image();
          img.src = src;
        });
      }, []);

    // 이미지 로드 후 클릭 문구 표시
    const handleImageLoad = () => {
        setTimeout(() => {
            setShowClickText(true);
        }, 500);
    };

    const handleClick = () => {
        if (!showClickText) return;

        if (currentIndex < images.length - 1) {
            const next = currentIndex + 1;
            setCurrentIndex(next);
            setFadeIn(false);
            setShowClickText(false);
            setTimeout(() => setFadeIn(true), 50);
        } else {
            navigate('/web-game/page1');
        }
    };

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <Menu />
            {currentIndex !== null && (
                <img
                    src={images[currentIndex]}
                    alt={`phone-${currentIndex}`}
                    className={`phone-image ${fadeIn ? 'fade-in' : ''}`}
                    onClick={handleClick}
                    onLoad={handleImageLoad}
                />
            )}
            {showClickText && <p className="click-text">이미지를 클릭하세요!</p>}
        </div>
    );
}

export default Phone;
