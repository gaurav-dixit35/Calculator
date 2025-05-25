// src/service/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWVF54Yedd-K_oWzyhsY4VK4_0biUYm2o",
  authDomain: "advancedcalculator-7ca2b.firebaseapp.com",
  projectId: "advancedcalculator-7ca2b",
  storageBucket: "advancedcalculator-7ca2b.appspot.com", // 🔁 fix if wrong
  messagingSenderId: "132339112401",
  appId: "1:132339112401:web:1ad4bd7331cc66f7c8e8f0",
  measurementId: "G-4FNJJSTNPV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
