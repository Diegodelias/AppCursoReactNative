// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase   from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdsuvbgzUXRX1gBjNY3J6pBqtywcZFh-Q",
  authDomain: "tenedores-33e4e.firebaseapp.com",
  projectId: "tenedores-33e4e",
  storageBucket: "tenedores-33e4e.appspot.com",
  messagingSenderId: "254727793599",
  appId: "1:254727793599:web:5972bb5511c7a54bba0f0a"
};

// Initialize Firebase
export  const firebaseApp = firebase.initializeApp(firebaseConfig);