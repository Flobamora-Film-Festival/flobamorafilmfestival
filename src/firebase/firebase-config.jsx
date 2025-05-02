// src/firebase/firebase-config.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATS45Vmx8aC-Ge-JzjcSaaur4H_0jVrHc",
  authDomain: "flobamorafilmfestival-c48c9.firebaseapp.com",
  projectId: "flobamorafilmfestival-c48c9",
  storageBucket: "flobamorafilmfestival-c48c9.firebasestorage.app",
  messagingSenderId: "221899610294",
  appId: "1:221899610294:web:636fde8229224f5b986e17",
  measurementId: "G-MDRWR9109F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };
