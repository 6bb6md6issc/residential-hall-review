import React, { useEffect, useState, useRef }  from 'react'
import logo from "../assets/navbarlogo.png"
import { Link } from 'react-router-dom';
import { useDebouncedCallback } from "use-debounce"

const NavBar = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // handle click outside and close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // todo
  const handleResultClick = (name) => {
    setSearchTerm(name);
    setShowDropdown(false);
  };

  const handleSearch = useDebouncedCallback(async (searchTerm) => {
    const searchParam = '/api/v1/building/search?searchText=' + searchTerm
    if (searchParam.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    try{
      const response = await fetch(searchParam, {
        method : "GET",
        headers: { 'Content-Type': 'application/json',},
      })
      if (!response.ok) throw new Error("Search request failed");
      const data = await response.json();
      setResults(data);
      setShowDropdown(true);
    } catch (error) {
      console.log("Error fetching buildings:", error);
      setResults([]);
      setShowDropdown(false);
    }
    
  }, 300);


  return (
    <div 
      className='border-b-2 border-black'
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2 space-y-4 md:space-y-0">
      
        <div
          className="flex items-center justify-center space-x-4 w-full md:w-auto"
          ref={dropdownRef}
        >
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12" />
          </Link>
          <div className='relative w-full sm:w-[300px]'>
            <input
              type="text"
              placeholder="Enter residential hall name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                handleSearch(e.target.value);
              }}
              className="rounded-lg w-full sm:w-[300px] h-10 px-4 border-2 border-black text-gray-500 bg-white text-md focus:outline-none focus:border-black"
              onFocus={() => results.length > 0 && setShowDropdown(true)}
            />
              {showDropdown && results.length > 0 && (
                <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto z-50">
                  {results.map((building, index) => (
                    <li
                      key={index}
                      onClick={() => handleResultClick(building.buildingName)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {building.buildingName}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>

      <div className="flex justify-center md:justify-end space-x-6 font-bold w-full md:w-auto">
        <h1>Review</h1>
        <h1>My Review</h1>
        <Link to="/login"><h1>Login</h1></Link>
      </div>
    </div>
  </div>
  )
}

export default NavBar;