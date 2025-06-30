import React from 'react'
import { useSearchParams } from 'react-router-dom'

const PaginationBar = ({ currentPage, pageCount }) => {

  const [_, setSearchParams] = useSearchParams();

  return (
    <div>
      <div className='flex justify-center my-10 '>
        {new Array(pageCount).fill(1).map((_, idx) =>(
          <button 
            key={idx}
            className={`mx-1 px-5 py-3 rounded-2xl
              ${currentPage == idx + 1 ? "bg-gray-300 text-[#0F2439] font-bold text-3xl" : "text-2xl cursor-pointer hover:bg-gray-300"}`
            }
            onClick={() => setSearchParams({page : idx + 1})}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PaginationBar