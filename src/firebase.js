import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_c9xXxVBfnKGM8c7ZBjlgWQuX1zlmJDg",
  authDomain: "nioblue.firebaseapp.com",
  databaseURL: "https://nioblue-default-rtdb.firebaseio.com",
  projectId: "nioblue",
  storageBucket: "nioblue.appspot.com",
  messagingSenderId: "596046515606",
  appId: "1:596046515606:web:fa879ce5e72ba13d35a1b7",
  measurementId: "G-JGT4XB239B",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);
export const db = getFirestore(app);
