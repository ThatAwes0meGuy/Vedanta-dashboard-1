// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARz8LYbekoSC462Z-x1CyJDLplQC80Wl0",
  authDomain: "health-dashboard-9c85a.firebaseapp.com",
  projectId: "health-dashboard-9c85a",
  storageBucket: "health-dashboard-9c85a.firebasestorage.app",
  messagingSenderId: "482026424923",
  appId: "1:482026424923:web:a4aad3daab35bb6af84d7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
