// src/utils/saveRanking.js
import { db } from '../firebase/firebase-config';
import { ref, push } from 'firebase/database';

export const saveRanking = (name, score) => {
  const rankRef = ref(db, 'ranking/');
  push(rankRef, {
    name,
    score,
    createdAt: Date.now()
  });
};