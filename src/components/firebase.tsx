// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvjsaefCVpRpp-maBw0s9E49Oq6KrD3DA",
  authDomain: "smart-calendar-a8f70.firebaseapp.com",
  projectId: "smart-calendar-a8f70",
  storageBucket: "smart-calendar-a8f70.firebasestorage.app",
  messagingSenderId: "69254138636",
  appId: "1:69254138636:web:1450345b71c726f6da1729",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
