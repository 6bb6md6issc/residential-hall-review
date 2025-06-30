import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import HouseCard from '../component/home/HouseCard'
import PaginationBar from '../component/PaginationBar'

const AllBuildingsPage = () => {

  const [buildings, setBuildings] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const loadAllBuildings = async () => {
      try{
        const response = await axios.get(`/api/v1/building/all?page=${currentPage-1}`)
        setBuildings(response.data)
      } catch(err) {
        console.log(err)
      } finally{
        setLoading(false);
      }
    }

    loadAllBuildings();
  }, [currentPage])

  if (loading) return (
    <div>loading ...</div>
  )

  return (
    <div className='my-10'>
      <div className='flex justify-center'>
        <div
          className="md:min-h-[400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-12 gap-y-8 md:gap-x-20 mt-8"
        >
          {buildings.content.map((building) => (
            <HouseCard 
              key={building.id} 
              buildingName={building.buildingName} 
              buildingId={building.id}
            />
          ))}
        </div>
      </div>
      <PaginationBar currentPage={currentPage} pageCount={buildings.totalPages} />
    </div>
  );
  
}

export default AllBuildingsPage