import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HouseCard from '../component/home/HouseCard'

const AllBuildingsPage = () => {

  const [buildings, setBuildings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAllBuildings = async () => {
      try{
        const response = await axios.get("/api/v1/building/all")
        setBuildings(response.data)
      } catch(err) {
        console.log(err)
      } finally{
        setLoading(false);
      }
    }

    loadAllBuildings();
  }, [])

  if (loading) return (
    <div>loading ...</div>
  )

  return (
    <div className='my-10'>
      <div 
        className="grid gap-5 justify-center"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 0px))',
        }}
      >
        {buildings.map((building) => (
          <HouseCard 
            key={building.id} 
            buildingName={building.buildingName} 
            buildingId={building.id}
          />
        ))}
      </div>
    </div>
  );
  
}

export default AllBuildingsPage