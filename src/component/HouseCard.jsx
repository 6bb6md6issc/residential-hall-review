import React, { useRef } from 'react';

const HouseCard = () => {
  const houseListRef = useRef(null);

  const houses = [
    { id: 1, name: 'House 1', price: '$200,000' },
    { id: 2, name: 'House 2', price: '$250,000' },
    { id: 3, name: 'House 3', price: '$300,000' },
    { id: 4, name: 'House 4', price: '$350,000' },
    { id: 5, name: 'House 5', price: '$400,000' },
    { id: 6, name: 'House 6', price: '$450,000' },
    { id: 7, name: 'House 7', price: '$500,000' },
    { id: 8, name: 'House 8', price: '$550,000' },
  ];

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
          {houses.map((house) => (
            <div key={house.id} 
              className="min-w-[300px] mx-2 h-50 bg-white p-4 rounded-lg"
              style={{ boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
            >
              <h2 className="text-xl font-bold">{house.name}</h2>
              <p>{house.price}</p>
            </div>
          ))}
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

export default HouseCard;
