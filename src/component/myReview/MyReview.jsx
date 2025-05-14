import React from 'react'
import OneReviewHistory from './OneReviewHistory';

const MyReview = () => {

  const reviews = [
    {building: "wasatch hall", date:"March 17, 2025"},
    {building: "wasatch hall", date:"March 17, 2025"},
    {building: "wasatch hall", date:"March 17, 2025"},
    {building: "wasatch hall", date:"March 17, 2025"},
    {building: "wasatch hall", date:"March 17, 2025"},
  ]

  return (
    <div className='w-full mt-10'>
      <h1 className='text-5xl sm:text-6xl font-bold text-center sm:text-left sm:ml-20 mb-10'>
        My Reviews
      </h1>
      <div
        className='pb-5 rounded-xl mx-8 sm:mx-20 bg-gray-200'
      >
        {/* table header */}
        <div className='h-10 flex items-center mx-5 font-bold '>
          <h1 className='w-1/4 hidden sm:block sm:text-center'>Building</h1>
          <h1 className='w-1/4 hidden sm:block sm:text-center'>Created At</h1>
        </div>
      
        {/* table body */}
        <div></div>
        {
          reviews.map(review => <OneReviewHistory review={review}/>)
        }
        
      </div>
    </div>
  )
}

export default MyReview

{/* <table
          className='w-full h-40 rounded-xl bg-blue-100'
        > 
          <thead>
            <tr>
              <th className='w-1/4 font-bold pt-6'>Building</th>
              <th className='w-1/4 font-bold pt-6'>Created At</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className='bg-red-100'>
            <tr className='bg-amber-50 h-15'>
              <td className='text-center'>
                {reviews[0].building}  
              </td>
              
              <td className='text-center'>
                {reviews[0].date}
              </td>

              <td>
                <div className='flex justify-end items-center'>
                  <button>
                    <Trash2 className='mx-5'/>
                  </button>
                  <Link>
                  <SquarePen className='mx-8'/>
                  </Link>
                </div>
              </td>
            </tr>


            <tr className='bg-amber-50 h-20 mx-10'>
              <td className='text-center'>
                {reviews[0].building}  
              </td>
              
              <td className='text-center'>
                {reviews[0].date}
              </td>

              <td>
                <div className='flex justify-end items-center'>
                  <button>
                    <Trash2 className='mx-5'/>
                  </button>
                  <Link>
                  <SquarePen className='mx-8'/>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table> */}