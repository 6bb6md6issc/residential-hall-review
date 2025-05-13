import React from 'react'
import ReviewHeader from '../component/review/ReviewHeader'

const ShareReviewPage = ({ hall }) => {
  return (
    <div>
      <ReviewHeader hallName={hall.hallName}/>
      <div className='px-10 md:px-20 lg:px-30 mt-20 flex flex-col'>
        <textarea 
          className="w-full h-80 border rounded focus:outline-none px-5 py-5 leading-none resize-none mb-5"
          type="text"
          placeholder="Type something..."
        />
        <div className='flex justify-end'>
          <button 
            className='w-24 h-10 justify-left rounded-xl font-bold text-white'
            style={{
              backgroundColor: '#0F2439',
              boxShadow: '2px 4px 4px -1px rgba(0, 0, 0, 0.4)'
            }}
          >share</button>
        </div>
      </div>
    </div>
  )
}

export default ShareReviewPage