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

  return (
    <div className='mb-20'>
      <ReviewHeader buildingName={data.building_name} buildingId={data.building_id}/>
      <ReviewList reviews={data.ratings || []}/>
    </div>
  )
}

export default HallReviewPage