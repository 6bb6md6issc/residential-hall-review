import React from 'react'
import { BASE_URL } from '../../config/config';

const Review = ({rating_value, rating_id, start_year, created_at, content}) => {

    return (
        <div className='mb-5'>
            <div className="flex w-full items-end pl-20 pr-20 mb-5">
                {/* First h1: rating */}
                <h1 style={{ color: '#0F2439' }}>
                    <span className="font-bold text-5xl" style={{ color: '#0F2439' }}>
                    {rating_value}
                    </span>/5
                </h1>

                {/* Second & Third h1 inside full-width flex container */}
                <div className="flex flex-col md:flex-row md:justify-between justify-end w-full ml-6 text-right">
                    <h1>
                    Term:
                    <span className="font-bold text-lg" style={{ color: '#0F2439' }}>
                        {start_year}
                    </span>
                    </h1>

                    <h3 className="text-lg">{new Date(created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                        })}
                    </h3>
                </div>
            </div>
            <div className='pl-20 pr-20 flex flex-col justify-between md:flex-row'>
                <div 
                    className='text-lg inline-block pb-5 pr-5' 
                    style={{ color: '#0F2439' }}
                >
                    {content}
                </div>
                <img 
                    src={`${BASE_URL}api/v1/image/${rating_id}`}
                    alt="" 
                    className='w-full md:w-[220px] rounded-2xl'
                />
            </div>
        </div>

  )
}

export default Review