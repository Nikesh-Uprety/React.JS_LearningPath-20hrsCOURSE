import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBndxcGItYSrJvthwHlCiuJEa_V04s-u-w",
  authDomain: "learn-reactjs-bed3a.firebaseapp.com",
  projectId: "learn-reactjs-bed3a",
  storageBucket: "learn-reactjs-bed3a.appspot.com",
  messagingSenderId: "1057042942375",
  appId: "1:1057042942375:web:3b4e218ec462f811440e82",
  measurementId: "G-H8NEVP7YPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

