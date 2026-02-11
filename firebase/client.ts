// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBFYlK7ZLEJT7MhWf-dwYPht6Ap88SHPdY",
    authDomain: "devprep-83ef8.firebaseapp.com",
    projectId: "devprep-83ef8",
    storageBucket: "devprep-83ef8.firebasestorage.app",
    messagingSenderId: "726100551339",
    appId: "1:726100551339:web:6d0e02ec14cd6123e1f9ee",
    measurementId: "G-WEVLTNXSGW"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);