import React from 'react'
import Hero from '../component/home/Hero'
import HouseCard from '../component/home/HouseScrollBar'
import HomePageCard from '../component/home/HomePageCard'

const HomePage = () => {
  return (
    <div>
        <Hero />
        <HouseCard/>
        <HomePageCard />
    </div>
  )
}

export default HomePage