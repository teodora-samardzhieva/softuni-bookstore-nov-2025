// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCywyotUd3O8as9kVP46fH1Bvgnqj0Huc0",
  authDomain: "bookstore-nov-2025.firebaseapp.com",
  projectId: "bookstore-nov-2025",
  storageBucket: "bookstore-nov-2025.firebasestorage.app",
  messagingSenderId: "817430686188",
  appId: "1:817430686188:web:33f57784eb4d0e250578c9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);