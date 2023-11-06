import React from 'react'
import Image from 'next/image'
import loader from './spinner.gif'

const Spinner = () => {
  return (
    <div className='w-32 h-screen flex-items-center justify-center'>
      <Image src={loader} alt='Loading...' />
    </div>
  )
}

export default Spinner;