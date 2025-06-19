import React from 'react'
import OneReviewHistory from '../component/myReview/OneReviewHistory';

const MyReviewPage = ({ reviews }) => {

  return (
    <div className='w-full mt-10'>
      <h1 className='text-5xl sm:text-6xl font-bold text-left ml-10 sm:ml-20 mb-10'>
        My Reviews
      </h1>
      <div
        className='pb-5 rounded-xl mx-8 sm:mx-20 bg-gray-200'
      >
        {/* table header */}
        <div className='h-15 flex items-center mx-5 font-bold '>
          <h1 className='w-1/4 hidden sm:block sm:text-center'>Building</h1>
          <h1 className='w-1/4 hidden sm:block sm:text-center'>Created At</h1>
        </div>
      
        {/* table body */}
        <div></div>
        {
          reviews.map(review => <OneReviewHistory review={review}/>)
        }
        
      </div>
    </div>
  )
}

export default MyReviewPage
