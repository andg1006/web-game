import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useLocation } from 'react-router-dom';

const BgmPlayer = forwardRef((_, ref) => {
  const location = useLocation();
  const audioRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getAudio: () => audioRef.current,
  }));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const isHiddenPage =
      location.pathname === '/web-game/' || location.pathname.includes('/phone');

    if (isHiddenPage) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.loop = true;
      audio.volume = 0.5;
      audio.muted = false;
      audio.play().catch((err) => {
        console.warn('🔇 자동 재생 차단됨:', err);
      });
    }

    return () => {
      if (isHiddenPage && audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [location.pathname]);

  return (
    <audio
      ref={audioRef}
      src={import.meta.env.BASE_URL + 'sounds/story-bgm.mp3'}
    />
  );
});

export default BgmPlayer;
