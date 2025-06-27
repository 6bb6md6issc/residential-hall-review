import React, { useEffect, useState } from 'react'
import ReviewList from '../component/review/ReviewList'
import ReviewHeader from '../component/review/ReviewHeader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NoSoBuilding from '../component/review/NoSoBuilding';


const HallReviewPage = () => {
  const { buildingId } = useParams()
  const [data, setData] = useState({})
  
  useEffect(() => {
    const fetchReview = async () => {
      try{
        const response = await axios.get(`/api/v1/rating/${buildingId}`);
        setData(response.data);
      } catch(error) {
        console.log("Error occurred" + error);
        setData(null)
     }
    };
    fetchReview();
  }, [buildingId])

  if (data === null) return <NoSoBuilding />


  if (!data.ratings || data.ratings.length === 0) {
    return (
      <div className='text-[#0F2439] text-2xl font-bold text-center my-8'>
        <p>No review yet</p>
        <p>Become the first to reivew</p>
      </div>
    )
  }

  return (
    <div className='mb-20'>
      <ReviewHeader buildingName={data.building_name} buildingId={data.building_id}/>
      <ReviewList reviews={data.ratings || []}/>
    </div>
  )
}

export default HallReviewPage