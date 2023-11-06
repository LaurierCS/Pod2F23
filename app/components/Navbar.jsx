'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { UserAuth } from '../context/Auth'
import { resolve } from 'styled-jsx/css'


const Navbar = () => {
    const {user, googleSignIn, logOut} = UserAuth();
    const [loading, setLoading] = useState(true)
 
    const SignInHandler = async() => {
        try{
            await googleSignIn();
        } catch(error){
            console.log(error);
        }
    }

    const SignOutHandler = async() => {
        try{
            await logOut();
        } catch(error){
            console.log(error);
        }
    }

    //console.log(user)
    useEffect(() =>{
        const checkauthentication = async()=>{
            await new Promise((resolve) => setTimeout(resolve,100))
            setLoading(false)
        }
        checkauthentication()
    },[user])
    
   
    return (
    <div className='h-20 w-full border-b-2 flex iterms-center justify-between p-2'>
        <ul className='flex'>
            <li className='p-2 cursor-pointer'>
                <Link href='/'>Home</Link>
            </li>
            <li className='p-2 cursor-pointer'>
                <Link href='/about'>About</Link>
            </li>
            <li className='p-2 cursor-pointer'>
                <Link href='/loginpage'>ActualLogin</Link>
            </li>
            <li className='p-2 cursor-pointer'>
                <Link href='/signup'>ActualSignUp</Link>
            </li>
            {!user ? null : (
                 <li className='p-2 cursor-pointer'>
                 <Link href='/profile'>Profile</Link>
             </li>
            )}
        </ul>

        {loading ? null : !user ? (<ul className='flex'>
            <li className='p-2 cursor-pointer' onClick={SignInHandler}>
                Login
            </li>
            <li className='p-2 cursor-pointer' onClick={SignInHandler}>
                Register
            </li>
        </ul>):(
            <div>
            <p>Welcome. {user.displayName}</p>
            <p onClick={SignOutHandler} className='cursor-pointer'>Sign out</p>
            </div>

        )}

        
    </div>
  )
}

export default Navbar