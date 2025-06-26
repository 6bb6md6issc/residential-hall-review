import React from 'react'
import image from "../../assets/image_copy.png"
import { Link } from 'react-router-dom'

const HouseCard = ({buildingName, buildingId}) => {
  return (
    <Link to={`/rating/${buildingId}`}>
    <div className='mx-2'>
      <div className='w-[240px] h-[160px]'>
        <img src={image} 
          alt="" 
          className='w-[240px] h-[80px] rounded-t-2xl object-cover object-[center_10%]' 
          style={{
            boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.4)'
          }}
        />
        <div className='w-[240px] h-[80px] rounded-b-2xl p-2.5 object-contain shadow-black/40 shadow-md'>
          <span className='font-bold'>{buildingName}</span>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default HouseCard