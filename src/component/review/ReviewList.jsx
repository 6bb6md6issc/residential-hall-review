import React from 'react'
import Review from './Review'

const ReviewList = ({reviews}) => {

  if (reviews.length === 0){
    return (
      <div className='text-[#0F2439] text-2xl font-bold text-center my-8'>
        <p>No review yet</p>
        <p>Become the first to reivew</p>
      </div>
    )
  }

  return (
    <div className='mt-5'>
      {reviews.map((review, i) => (
        <Review
          key={i}
          rating_value={review.rating_value}
          start_year={review.start_year}
          created_at={review.created_at}
          content={review.content}
          rating_id={review.rating_id}
        />
      ))}
    </div>
  );
};

export default ReviewList;