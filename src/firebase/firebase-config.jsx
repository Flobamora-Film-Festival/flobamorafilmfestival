// src/firebase/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCir2oWQuRDXtwD0EAsUHGgBDSUfW6EQ-Q",
  authDomain: "flobamorafilmfestival-72150.firebaseapp.com",
  projectId: "flobamorafilmfestival-72150",
  storageBucket: "flobamorafilmfestival-72150.firebasestorage.app",
  messagingSenderId: "142664997370",
  appId: "1:142664997370:web:4a33a0b01be0aae9d52c43",
  measurementId: "G-0SWH4CQSJP",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
