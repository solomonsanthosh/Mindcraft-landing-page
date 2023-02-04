// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAX_As7aJtyYysCWp5NAmfQ1d-o76VpoM",
  authDomain: "mindcraft-e5c44.firebaseapp.com",
  projectId: "mindcraft-e5c44",
  storageBucket: "mindcraft-e5c44.appspot.com",
  messagingSenderId: "267408601160",
  appId: "1:267408601160:web:e75a00c78e04997ab7287d",
  measurementId: "G-2E5QDGCQDE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
