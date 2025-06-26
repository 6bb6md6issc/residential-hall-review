import React, { useEffect, useRef, useState } from 'react';
import HouseCard from './HouseCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
const HouseScrollBar = () => {
  const houseListRef = useRef(null);

  const [buildings, setBuildings] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const loadAllBuildings = async () => {
      try{
        const response = await axios.get("/api/v1/building/all")
        setBuildings(response.data)
      }catch(err) {
        console.log(err)
      }finally{
        setLoading(false);
      }
    }

    loadAllBuildings();
  }, [])

  // Function to scroll the list to the right
  const scrollRight = () => {
    if (houseListRef.current) {
      const scrollAmount = 330; // Amount to scroll (approximately the width of 3-4 houses)
      houseListRef.current.scrollLeft += scrollAmount;
    }
  };

  const scrollLeft = () => {
    if (houseListRef.current) {
      const scrollAmount = 330; // Amount to scroll (approximately the width of 3-4 houses)
      houseListRef.current.scrollLeft -= scrollAmount;
    }
  };

  if (loading) return (
    <div>loading ...</div>
  )

  return (
    <div className="relative mt-8 mb-20">
      <div className="flex items-center ml-20 mr-20">
        {/* Left Arrow Button */}
        <button 
          onClick={scrollLeft} 
          className="absolute left-10 z-10 bg-gray-500 text-white p-2 rounded-full">
          &#8592;
        </button>
        
        {/* Scrollable List of Houses */}
        <div className="flex overflow-x-auto scroll-smooth py-2 hide-scrollbar" ref={houseListRef}>
          {buildings.slice(0, 7).map((building) => (
            <HouseCard 
              key={building.id} 
              buildingName={building.buildingName} 
              buildingId={building.id}
            />
          ))}
          <Link to={`/all-buildings`}>
            <div className='min-w-[240px] h-[160px] border-1 shadow-black/40 shadow-md rounded-2xl flex items-center justify-center hover:bg-gray-200 cursor-pointer'>
              <div className='text-center'>
                <p className='font-bold text-3xl'>More</p>
                <p className='mt-5'>See All Buildings</p>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Right Arrow Button */}
        <button 
          onClick={scrollRight} 
          className="absolute right-10 z-10 bg-gray-500 text-white p-2 rounded-full">
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default HouseScrollBar;
