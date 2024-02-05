// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-estate-a7c59.firebaseapp.com",
  projectId: "mern-estate-a7c59",
  storageBucket: "mern-estate-a7c59.appspot.com",
  messagingSenderId: "573369529833",
  appId: "1:573369529833:web:aef45cf0db15a02a318778",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
