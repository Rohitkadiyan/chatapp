// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEaewLfdOAjdL8KjZBrFbgSm24ZsruM0w",
  authDomain: "whatsapp-b1196.firebaseapp.com",
  projectId: "whatsapp-b1196",
  storageBucket: "whatsapp-b1196.appspot.com",
  messagingSenderId: "662314690682",
  appId: "1:662314690682:web:3794115a58298289bf33c3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
