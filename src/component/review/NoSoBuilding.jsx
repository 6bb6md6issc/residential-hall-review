import { Link } from 'react-router-dom'
const NoSoBuilding = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='sm:text-5xl text-4xl text-[#0F2439] font-bold mb-10'>Building Not Found</div>
      <Link 
        to={"/all-buildings"} 
        className='h-[60px] bg-[#0F2439] text-white text-2xl rounded-2xl w-[200px] mx-5 flex items-center justify-center'
      >
          See All Buildings
      </Link>
    </div>
  )
}

export default NoSoBuilding