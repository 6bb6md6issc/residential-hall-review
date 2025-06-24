import React from 'react'

const FieldErrorMessage = ({fieldError, field}) => {
  return (
    <div>
      <h2 className='text-red-500 mb-2'>{fieldError?.[field] || "\u00A0"}</h2> 
    </div>
  )
}

export default FieldErrorMessage