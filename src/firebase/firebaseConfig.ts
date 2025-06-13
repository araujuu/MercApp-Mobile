// src/firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaX7c-xfEA44bU1LVc_nb_qFHVOnvBTuM",
  authDomain: "mercapp-e903c.firebaseapp.com",
  projectId: "mercapp-e903c",
  storageBucket: "mercapp-e903c.firebasestorage.app",
  messagingSenderId: "113953025696",
  appId: "1:113953025696:web:3c4c12aa73a4155d0da3c5",
  measurementId: "G-EL6C64GJSV"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app); 

export { db, storage };

export default app;