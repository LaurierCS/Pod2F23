import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../src/app/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore'; 
import { useRouter } from 'next/router';
import NavBar from '../src/app/Utility/NavBar'
import './main.css'

const ChatRenderingPage = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false); // New state to control rendering
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUsername(userDoc.data().username);
                }
                setIsReady(true); // Set ready state to true if user is authenticated
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsReady(true); 
        }, 3000);

        return () => clearTimeout(timeoutId); // clears timeout
    }, []);

    if (!isReady) {
        return <div>Loading...</div>; // Loading instead of rendering chat temporarely.
    }

    return (
       <>
        <NavBar />
        <div>ChatRenderingPage</div> 
       </> 
       
    );
}

export default ChatRenderingPage;
