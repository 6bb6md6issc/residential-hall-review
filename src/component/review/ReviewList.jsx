import React from 'react'
import Review from './Review'

const ReviewList = ({reviews}) => {
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