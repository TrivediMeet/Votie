import Navbar from '@/components/base/Navbar'
import React from 'react'

function clashItems({params}:{params:{id:number}}) {

  return (
    <div className='container'>
        <Navbar></Navbar>

        <div className='mt-4'>
            <h1 className='text-2xl lg:text-4xl font-extrabold'>Clash Title</h1>
            <p className='text-lg'>Clash Description</p>
        </div>
      
    </div>
  )
}

export default clashItems
