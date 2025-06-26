import React from 'react'
import { Trash2, SquarePen } from 'lucide-react';
import { Link } from 'react-router-dom';

const OneReviewHistory = ({ review }) => {

  const rawDate = review.created_at;
  const date = new Date(rawDate);

  const formatted = new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  }).format(date);

  return (
    <div className='bg-white rounded-md mx-5 mb-2'>
      <div className='flex-col items-center sm:flex sm:flex-row'>
        <h1 className='py-2 pl-10 font-bold sm:pl-0 sm:w-1/4 sm:text-center '>{review.building_name}</h1>
        <hr className='mx-5 border-t-3 rounded sm:hidden'/>
        <div className='flex items-center w-full sm:w-3/4'>
          <h1 className='py-2 w-1/2 pl-10 sm:pl-0 sm:w-1/3 sm:text-center'>
            {formatted}
          </h1>
          <div className='w-1/2 sm:w-2/3 flex justify-end items-center'>
            <Link to={`/share/${review.building_id}`}>
              <SquarePen className='mx-5 sm:mr-10 h-5'/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OneReviewHistory