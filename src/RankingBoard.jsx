import { db } from './firebase/firebase-config';
import { ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

function RankingBoard() {
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        const rankRef = ref(db, 'ranking/');
        onValue(rankRef, (snapshot) => {
            const data = snapshot.val();
            const rankArray = data
                ? Object.values(data)
                : [];

            // ✅ 점수 내림차순 정렬 + 점수가 같으면 createdAt 오래된 순
            const sorted = rankArray.sort((a, b) => {
                if (b.score !== a.score) {
                    return b.score - a.score; // 점수 높은 순
                } else {
                    return a.createdAt - b.createdAt; // 오래된 순
                }
            });

            setRankings(sorted);
        });
    }, []);

    return (
        <ol>
            <div className="top3">
                <ul>
                    {rankings.slice(0, 3).map((rank, index) => (
                        <li key={index}>
                            {index === 0 && '👑 1등'} {index === 1 && '🥈 2등'} {index === 2 && '🥉 3등'}
                            <span> - {rank.name} ({rank.score}점)</span>
                        </li>
                    ))}
                </ul>
            </div>
            {rankings.slice(3).map((rank, index) => (
                <li key={index + 3}>
                    {index + 4}. {rank.name} - {rank.score}점
                </li>
            ))}
        </ol>
    );
}

export default RankingBoard;
