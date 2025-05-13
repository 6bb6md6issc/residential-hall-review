import React from 'react'


const Review = ({rating, term, date, content}) => {

    return (
        <div className='mb-5'>
            <div className="flex w-full items-end pl-20 pr-20 mb-5">
                {/* First h1: rating */}
                <h1 style={{ color: '#0F2439' }}>
                    <span className="font-bold text-5xl" style={{ color: '#0F2439' }}>
                    {rating}
                    </span>/5
                </h1>

                {/* Second & Third h1 inside full-width flex container */}
                <div className="flex flex-col md:flex-row md:justify-between justify-end w-full ml-6 text-right">
                    <h1>
                    Term:
                    <span className="font-bold text-lg" style={{ color: '#0F2439' }}>
                        {term}
                    </span>
                    </h1>

                    <h1 className="text-lg">{date}</h1>
                </div>
            </div>
            <div className='pl-20 pr-20'>
                <div 
                    className='text-lg inline-block pb-5 border-b' 
                    style={{ color: '#0F2439' }}
                >
                    {content}
                </div>
            </div>
        </div>

  )
}

export default Review