import React from 'react'

export default function loginpage(){
  return (
    <main>
        <div className='text-center'>
    <h1>Welcome to SpeedChat.</h1>
    <p>a New world.</p>
    </div>
<div className='flex justify-center items-center mt-6'>


    <input placeholder='Email' type="text" className='text-center text-black' />
    <input placeholder='Password' type="text" className='text-center text-black ml-10' />
    <button className='ml-5 bg-white text-black w-20'>Submit</button>
    </div>

    </main>
  )
}
