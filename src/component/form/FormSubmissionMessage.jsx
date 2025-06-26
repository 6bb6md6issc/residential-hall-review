import React from 'react'

const FormSubmissionMessage = ({outcome}) => {
  return (
    <div>
      {
        outcome.success ? 
          <h2 className='text-green-500 mb-4'>{outcome.message || "\u00A0"}</h2>
          :
          <h2 className='text-red-600 mb-4'>{outcome.message || "\u00A0"}</h2>
      }
    </div>
  )
}

export default FormSubmissionMessage