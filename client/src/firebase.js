// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-eebca.firebaseapp.com",
  projectId: "estate-eebca",
  storageBucket: "estate-eebca.appspot.com",
  messagingSenderId: "596957517181",
  appId: "1:596957517181:web:7af0291bea4bd5a3ba6814"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);