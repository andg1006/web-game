import { useState } from 'react';
import './RankingModal.css';

function RankingModal({ score, onRegister, onCancel }) {
    const [step, setStep] = useState('ask'); // ask / input
    const [name, setName] = useState('');

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
                        placeholder="이름 입력"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="btn-group">
                        <button onClick={() => onRegister(name)}>확인</button>
                        <button onClick={() => setStep('ask')}>돌아가기</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default RankingModal;
