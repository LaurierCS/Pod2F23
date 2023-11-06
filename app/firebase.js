// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA65afCdT3O74ckq46xVj1h9m9qgFNqIaI",
  authDomain: "nextjs-auth-7a0e7.firebaseapp.com",
  projectId: "nextjs-auth-7a0e7",
  storageBucket: "nextjs-auth-7a0e7.appspot.com",
  messagingSenderId: "856120889970",
  appId: "1:856120889970:web:e0e57f14f5b8ece83da8eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
