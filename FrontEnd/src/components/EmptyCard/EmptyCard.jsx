import React from 'react'

function EmptyCard({imageUrl, message}) {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src={imageUrl} alt="No Notes" className='w-60' />
        <p className='w-full md:w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5 p-2'>{message}</p>
    </div>
  )
}

export default EmptyCard