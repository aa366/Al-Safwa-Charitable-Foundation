
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrQcv-Jy6fsdNJ3aZfNUQw8V1TAFACKNs",
  authDomain: "el-safwat.firebaseapp.com",
  projectId: "el-safwat",
  storageBucket: "el-safwat.firebasestorage.app",
  messagingSenderId: "1058472264598",
  appId: "1:1058472264598:web:804c382fb8112fecb193b7",
  measurementId: "G-P57B5DD4VE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const data = getFirestore(app) 
// const analytics = getAnalytics(app);