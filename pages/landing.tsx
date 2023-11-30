import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../src/app/firebase/firebase'; 
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; 
import './main.css';
import AvatarRendering from '../src/app/logic/AvatarUpload'
import NavBar from '../src/app/Utility/NavBar'


const Landing = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null); // State for username
  const [avatarUrl, setAvatarUrl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        // gets the username and avatar URL from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
          //the avatar URL is stored under the key 'avatarURL'
          const avatarUrl = userDoc.data().avatarURL;
          setAvatarUrl(avatarUrl); 
        }
      } else {
        router.push('/login');
      }
    });
  
    return () => unsubscribe();
  }, [router]);
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUsername(null);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
    <NavBar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        {avatarUrl && (
  <img
    src={avatarUrl}
    alt="User Avatar"
    className="w-60 h-40 rounded-full mb-4"
  />
)}
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Welcome to the Landing Page</h1>
          <p>Email: <span className='text-blue-600'>{currentUser?.email}</span></p>
          {username && <p className="text-lg mb-2">Logged in as {username}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="av relative top-64">
        {currentUser && <AvatarRendering userId={currentUser.uid} />}
        </div>
      </div>
    </>
  );
  
};

export default Landing;
