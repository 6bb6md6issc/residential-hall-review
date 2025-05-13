import React from 'react'
import { Link } from 'react-router-dom';

const ReviewHeader = ({hallName}) => {
  return (
    <>
      <h1 
        className='pl-10 md:pl-30 p-10 md:w-1/2 text-6xl font-bold'
      >
        <span className='text-2xl font-normal pr-1.5'>review/</span>
        {hallName}
      </h1>
      <div 
        className='flex pl-10 pr-10 md:pl-20 md:pr-20 lg:pl-30 lg:pr-30 mt-5 mb-20'
      >
        <Link 
          className='w-1/2 h-16 sm:h-20 flex items-center justify-center text-white text-2xl font-bold' 
          style={{ backgroundColor: '#0F2439',
            boxShadow: '2px 6px 6px -1px rgba(0, 0, 0, 0.4)'
          }}
        >
          Read
        </Link>
        
        <Link 
          className='w-1/2 h-16 sm:h-20 flex items-center justify-center text-white text-2xl font-bold'
          style={{
            backgroundColor: '#8e8e8e',
            boxShadow: '0 6px 6px -1px rgba(0, 0, 0, 0.4)'
          }}
        >
          Share
        </Link>
      </div>
    </>
  )
}

export default ReviewHeader