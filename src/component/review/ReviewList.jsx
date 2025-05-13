import React from 'react'
import Review from './Review'

const ReviewList = ({reviews}) => {
  return (
    <div className='mt-5'>
      {reviews.map((review, i) => (
        <Review
          key={i}
          rating={review.rating}
          term={review.term}
          date={review.date}
          content={review.content}
        />
      ))}
    </div>
  );
};

export default ReviewList;