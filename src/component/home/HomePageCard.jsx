import React from 'react'
import leftCard from "../../assets/share_image.png"
import rightCard from "../../assets/find_residential_hall.png"
import { Link } from 'react-router-dom'

const HomePageCard = () => {
  return (
    <div className='flex flex-col lg:flex-row mt-5 mb-5 gap-4'>
      <div 
        className="max-w-md mx-auto border-1 bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center w-90"
        style={{ boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' }}
      >
        <img src={leftCard} alt="Logo" className="h-30 mb-5"/>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Share Experience</h1>
        <Link 
          to={'/all-buildings'}
          className="px-10 py-2 border-2 border-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-300 font-medium text-gray-800"
        >
          share
        </Link>
      </div>
      <div 
        className="max-w-md mx-auto border-1 bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center w-90"
        style={{ boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' }}
      >
        <img src={rightCard} alt="Logo" className="h-30 mb-5"/>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Residential Hall</h1>
        <Link 
          to={'/all-buildings'}
          className="px-10 py-2 border-2 border-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-300 font-medium text-gray-800"
        >
          Find
        </Link>
      </div>
    </div>
  )
}

export default HomePageCard
