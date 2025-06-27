import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4fdMT_GnEXk4hoAFLcfG4qcBHH6k7scI",
  authDomain: "voiceline-app.firebaseapp.com",
  projectId: "voiceline-app",
  storageBucket: "voiceline-app.firebasestorage.app",
  messagingSenderId: "12122109640",
  appId: "1:12122109640:web:dea72986bc570fa1ab17fd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
