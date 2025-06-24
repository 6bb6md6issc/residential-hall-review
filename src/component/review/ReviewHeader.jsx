import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const ReviewHeader = ({buildingName, buildingId}) => {

  const path = useLocation().pathname;
  const isSharePage = path.startsWith("/share");
  const isRatingPage = !isSharePage;

  const currentPageUnderline = "bg-blue-500 w-[80px] h-[5px] rounded-3xl my-[5px]";
  const notCurrentPage = "w-[80px] h-[5px] my-[5px]";

  return (
    <>
      <h2 
        className='pl-10 md:pl-30 p-10 md:w-1/2 text-6xl font-bold'
      >
        <span className='text-2xl font-normal pr-1.5'>review/</span>
        {buildingName}
      </h2>
      <div 
        className='flex ml-15 mr-15 md:ml-20 md:mr-20 lg:ml-30 lg:mr-30 mt-5 mb-20 border-b-2'
      >
        <Link 
          className='w-1/2 h-16 sm:h-20 flex flex-col items-center justify-center text-2xl font-bold' 
          to={`/rating/${buildingId}`}
        >
          Read
          <div className={isRatingPage ? currentPageUnderline : notCurrentPage} />
        </Link>
        
        <Link 
          className='w-1/2 h-16 sm:h-20 flex flex-col items-center justify-center text-black text-2xl font-bold'
          to={`/share/${buildingId}`}
        >
          Share
          <div className={isSharePage ? currentPageUnderline : notCurrentPage}/>
        </Link>
      </div>
    </>
  )
}

export default ReviewHeader