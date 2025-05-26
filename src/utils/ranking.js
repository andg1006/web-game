import { db } from '../firebase/firebase-config';
import { ref, push } from 'firebase/database';

export const saveRanking = (name, score) => {
  const rankRef = ref(db, 'ranking/');
  push(rankRef, { name, score, createdAt: Date.now() });
};

const rankRef = query(ref(db, "ranking/"), orderByChild("score"), limitToLast(10));
const snapshot = await get(rankRef);
const result = [];

snapshot.forEach(child => {
  result.push(child.val());
});

// 높은 점수 순 정렬
return result.sort((a, b) => b.score - a.score);
