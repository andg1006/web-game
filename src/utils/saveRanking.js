// saveRanking.js

import { db } from '../firebase/firebase-config';
import { ref, push, set, get, child } from 'firebase/database';

export const saveRanking = async (name, score, overwrite = false) => {
  const rankRef = ref(db, 'ranking');

  const snapshot = await get(rankRef);
  const data = snapshot.val();

  let existingKey = null;
  if (data) {
    for (const key in data) {
      if (data[key].name === name) {
        existingKey = key;
        break;
      }
    }
  }

  if (existingKey && overwrite) {
    const updateRef = child(rankRef, existingKey);
    await set(updateRef, { name, score, createdAt: Date.now() });
  } else if (!existingKey) {
    await push(rankRef, { name, score, createdAt: Date.now() });
  } else {
    throw new Error('EXISTS');
  }
};
