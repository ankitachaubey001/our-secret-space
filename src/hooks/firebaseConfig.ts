import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFM9oRVbtbe_-YyFMT1DjLF_E4sYzRm9A",
  authDomain: "our-secret-space.firebaseapp.com",
  projectId: "our-secret-space",
  storageBucket: "our-secret-space.firebasestorage.app",
  messagingSenderId: "563313155395",
  appId: "1:563313155395:web:71de67998e26516b7aa3f6",
  measurementId: "G-5Z881S36LP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
