// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-2a0bf.firebaseapp.com",
  projectId: "real-estate-2a0bf",
  storageBucket: "real-estate-2a0bf.appspot.com",
  messagingSenderId: "594414690948",
  appId: "1:594414690948:web:55e14bf8eb49044881d8d1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);