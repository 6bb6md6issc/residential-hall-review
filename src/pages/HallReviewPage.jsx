import React from 'react'
import ReviewList from '../component/review/ReviewList'
import ReviewHeader from '../component/review/ReviewHeader';
import { Link } from 'react-router-dom';

const HallReviewPage = ({ hall }) => {

  return (
    <div>
      <ReviewHeader hallName={hall.hallName}/>
      <ReviewList reviews={hall.reviews}/>
    </div>
  )
}

export default HallReviewPage