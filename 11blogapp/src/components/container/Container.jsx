import React from 'react'

export default function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>
  )
}

//to add additional classes to all the children in one go