import { db } from './firebase/firebase-config';
import { ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

function RankingBoard() {
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        const rankRef = ref(db, 'ranking/');
        onValue(rankRef, (snapshot) => {
            const data = snapshot.val();
            console.log("🔥 불러온 랭킹 데이터:", data);  // 여기 찍히는지 확인!
            const rankArray = data ? Object.values(data) : [];
            const sorted = rankArray.sort((a, b) => b.score - a.score);
            setRankings(sorted);
        });
    }, []);

    return (
        <ol>
            {rankings.map((rank, index) => (
                <li key={index}>
                    {rank.name} - {rank.score}점
                </li>
            ))}
        </ol>
    );
}

export default RankingBoard;
