import React, { useState }  from 'react'
import logo from "../assets/navbarlogo.png"
import { Link } from 'react-router-dom';

const NavBar = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
      setSearchTerm(e.target.value);
  };
  
  return (
    <div 
      className='border-b-2 border-black'
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2 space-y-4 md:space-y-0">
      
        <div className="flex items-center justify-center space-x-4 w-full md:w-auto">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12" />
          </Link>
          <input
            type="text"
            placeholder="Enter residential hall name"
            value={searchTerm}
            onChange={handleSearch}
            className="rounded-lg w-full sm:w-[300px] h-10 px-4 border-2 border-black text-gray-500 bg-white text-md focus:outline-none focus:border-black"
          />
        </div>

      <div className="flex justify-center md:justify-end space-x-6 font-bold w-full md:w-auto">
        <h1>Review</h1>
        <h1>My Review</h1>
        <h1>Login</h1>
      </div>
    </div>
  </div>
  )
}

export default NavBar;