import React, { useEffect, useState } from 'react'
import ReviewList from '../component/review/ReviewList'
import ReviewHeader from '../component/review/ReviewHeader';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import NoSoBuilding from '../component/review/NoSoBuilding';
import PaginationBar from '../component/PaginationBar';

const HallReviewPage = () => {
  const { buildingId } = useParams()
  const [data, setData] = useState({})

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  
  useEffect(() => {
    const fetchReview = async () => {
      try{
        const response = await axios.get(`/api/v1/rating/${buildingId}?page=${currentPage-1}`);
        setData(response.data);
      } catch(error) {
        console.log("Error occurred" + error);
        setData(null)
     }
    };
    fetchReview();
  }, [buildingId, currentPage])

  if (data === null) return <NoSoBuilding />

  return (
    <>
      <div className='mb-20'>
        <ReviewHeader buildingName={data.building_name} buildingId={data.building_id}/>
        <ReviewList reviews={data.ratings || []}/>
      </div>
      <PaginationBar currentPage={currentPage} pageCount={data.total_pages} />
    </>
  )
}

export default HallReviewPage