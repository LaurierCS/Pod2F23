'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext()


//use your google account to sign up/sign in
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const googleSignIn = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider);
    }
    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) =>{
            setUser(currentuser)
        })
        return () => unsubscribe()
    }, [user])

    return (
    <AuthContext.Provider value={{user, googleSignIn, logOut}}>{children}</AuthContext.Provider>
    )
}
//sign up with google.
export const UserAuth = () => {
    return useContext(AuthContext)
}