// src/firebase/firebase-config.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase 설정 정보
const firebaseConfig = {
  apiKey: "AIzaSyBH1ABz6CiiO2s6DYvD6Uv_iKl6jBnGIik",
  authDomain: "webgame-ranking.firebaseapp.com",
  databaseURL: "https://webgame-ranking-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webgame-ranking",
  storageBucket: "webgame-ranking.firebasestorage.app",
  messagingSenderId: "865370369695",
  appId: "1:865370369695:web:643cc8713bea1e82f73caa"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// ✅ Realtime Database 인스턴스 가져오기
const db = getDatabase(app);

// ✅ db 내보내기
export { db };
