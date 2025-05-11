import React from 'react'
import Review from './Review'

const ReviewList = () => {
  const reviews = [
    {
      rating: 5,
      term: "2024-2025",
      date: "Mar 17th, 2025",
      content:
        "A WONDERFUL Professor. She is very good at what she does, teaches very clearly, and ACTUALLY SHOWS EXAMPLES. Even though it was at 8 am, Zhang managed to teach things very clearly. Tests were very fair in my opinion, very similar to practice exam. Would take her again, I hope i get her for 6A",
    },
    {
      rating: 4,
      term: "2023-2025",
      date: "Mar 10th, 2025",
      content:
        "A WONDERFUL Professor. She is very good at what she does, teaches very clearly, and ACTUALLY SHOWS EXAMPLES. Even though it was at 8 am, Zhang managed to teach things very clearly. Tests were very fair in my opinion, very similar to practice exam. Would take her again, I hope i get her for 6A",
    },
    {
      rating: 3,
      term: "2022-2023",
      date: "Mar 16th, 2025",
      content:
        "A WONDERFUL Professor. She is very good at what she does, teaches very clearly, and ACTUALLY SHOWS EXAMPLES. Even though it was at 8 am, Zhang managed to teach things very clearly. Tests were very fair in my opinion, very similar to practice exam. Would take her again, I hope i get her for 6A",
    },
  ];

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