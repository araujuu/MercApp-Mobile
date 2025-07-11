// src/firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "#",
  authDomain: "#",
  projectId: "#",
  storageBucket: "#",
  messagingSenderId: "#",
  appId: "#",
  measurementId: "#"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app); 

export { db, storage };

export default app;
