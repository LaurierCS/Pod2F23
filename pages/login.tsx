import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../src/app/firebase/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import './main.css'

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the main route after successful login
      router.push('/landing');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error logging in:', error.message);
      } else {
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Login
        </button>
        <p>No account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
};

export default Login;
