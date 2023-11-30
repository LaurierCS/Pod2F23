import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK7c05pCHjuJIzb9GXzjjJ-3E9NVCyypk",
  authDomain: "speedchat-4981a.firebaseapp.com",
  projectId: "speedchat-4981a",
  storageBucket: "speedchat-4981a.appspot.com",
  messagingSenderId: "895036818176",
  appId: "1:895036818176:web:f6485c75a908f8d716a9e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export default app;
export { auth, db, storage };