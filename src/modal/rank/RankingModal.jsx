import { useState, useEffect } from 'react';
import './RankingModal.css';
import { get, ref } from 'firebase/database';
import { db } from '../../firebase/firebase-config'; // ✅ firebase 경로 확인해줘!

function RankingModal({ score, onRegister, onCancel }) {
    const [step, setStep] = useState('ask'); // ask / input / confirm
    const [name, setName] = useState('');
    const [existing, setExisting] = useState(false);

    // 닉네임 존재 여부 확인
    const checkNameExists = async (name) => {
        const snapshot = await get(ref(db, 'ranking'));
        const data = snapshot.val();

        if (data) {
            return Object.values(data).some(entry => entry.name === name);
        }
        return false;
    };

    const handleConfirm = async () => {
        const exists = await checkNameExists(name);

        // 앞뒤 공백 제거
        const trimmed = name.trim();

        // 정규식 검사
        const isOnlyHangulAndSpace = /^[가-힣]+( [가-힣]+)*$/.test(trimmed);

        // 자음/모음 단독 거르기
        const containsIncomplete = /[ㄱ-ㅎㅏ-ㅣ]/.test(trimmed);

        if (trimmed.length < 2 || trimmed.length > 10) {
            alert('이름은 2자 이상 10자 이하로 입력해주세요.');
            return;
        }

        if (!isOnlyHangulAndSpace || containsIncomplete) {
            alert('이름은 완성된 한글만 허용하며, 중간에만 띄어쓰기를 사용할 수 있어요.');
            return;
        }

        // ✅ 중복 검사
        if (exists) {
            setExisting(true);
            setStep('confirm'); // 덮어쓰기 여부 묻기
        } else {
            onRegister(name); // 바로 등록
        }
    };

    return (
        <div className="ranking-modal">
            {step === 'ask' && (
                <>
                    <h2>당신의 점수: {score}점</h2>
                    <p>랭킹 등록을 하시겠습니까?</p>
                    <div className="btn-group">
                        <button onClick={() => setStep('input')}>예</button>
                        <button onClick={onCancel}>아니요</button>
                    </div>
                </>
            )}

            {step === 'input' && (
                <>
                    <p>랭킹에 등록할 이름을 적어주세요</p>
                    <input
                        type="text"
                        placeholder="한글 2자 이상 10자 이하"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="btn-group">
                        <button onClick={handleConfirm}>확인</button>
                        <button onClick={() => setStep('ask')}>돌아가기</button>
                    </div>
                </>
            )}

            {step === 'confirm' && (
                <>
                    <p>이미 존재하는 이름입니다. <br />
                        점수를 덮어쓰시겠습니까?</p>
                    <div className="btn-group">
                        <button onClick={() => onRegister(name, true)}>예</button>
                        <button onClick={() => setStep('input')}>아니요</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default RankingModal;
