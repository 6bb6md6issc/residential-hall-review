import React from 'react'
import logo from "../assets/image.png"
const Footer = () => {
  return (
    <div className='relatve  flex justify-center items-center h-60 bg-[#0F2439] w-full'>  
        <img src={logo} alt="Logo" className="h-20 absolute left-[20px]" />
        <h1 className='text-white'>AG's Housing</h1>

    </div>
  )
}

export default Footer
