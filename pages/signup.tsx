"use client"
import './main.css';
import { useRouter } from 'next/router'; 
import React, { useState, useEffect } from 'react';
import { auth, db } from '../src/app/firebase/firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; 

const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>(''); // State for username
    const [routerReady, setRouterReady] = useState(false);
    const router = useRouter(); 

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Store the username in Firestore under the user's UID
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: username
        });
        console.log('User created:', userCredential.user);

        // Redirect to /landing on success
        router.push('/landing');
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error signing up:', error.message);
        } else {
          console.error('Error signing up:', error);
        }
      }
    };


    return (
     <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
          <p className='text-center'>Welcome To SpeedChat</p> <br />
          <input
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
          <p>Already have an account? <a href="/login">Login</a></p>
        </form>
      </div>
     </>
    );
};

export default SignUp;
