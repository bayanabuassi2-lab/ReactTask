import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaCK5QZ5r8IWoymN4RCn5Agm2zHtrlQ",
  authDomain: "firsttask-a93c7.firebaseapp.com",
  projectId: "firsttask-a93c7",
  storageBucket: "firsttask-a93c7.firebasestorage.app",
  messagingSenderId: "775617975210",
  appId: "1:775617975210:web:3202d262757ebaa54651d3",
  measurementId: "G-JS3EVDZKWX",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
};
