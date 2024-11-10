import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB269haUYQbVOU4YqMbinT-RgN7YTWCQE4",
  authDomain: "scorekeeper-6e23d.firebaseapp.com",
  projectId: "scorekeeper-6e23d",
  storageBucket: "scorekeeper-6e23d.firebasestorage.app",
  messagingSenderId: "877778970801",
  appId: "1:877778970801:web:9355496196bb1cd54b1a90",
  measurementId: "G-SPMQ6GD6EJ"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);