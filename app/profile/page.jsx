'use client'
import React, {useEffect, useState} from 'react'
import { UserAuth } from '../context/Auth'
import Spinner from '../components/Spinner'


export default function profile() {
  const {user} = UserAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    const checkauthentication = async()=>{
        await new Promise((resolve) => setTimeout(resolve,100))
        setLoading(false)
    }
    checkauthentication()
},[user])

  return (
    <div className='p-4'>
      {loading ? (
      <Spinner />
      ):user ? (
        <p>Welcome, {user.displayName} - You are logged in.</p>
      ):(
        <p>You must be logged in to view this route.</p>
      ) }
    </div>
  )
}
