"use client"

import { Upload } from 'lucide-react'
import React ,{useState,useRef} from 'react'
import { Button } from '../ui/button'

export default function AddClashItems({token,clashId}:{token:string,clashId:number}) {
  
  const [items,setItems] = useState<Array<ClashItemForm>>([
    {
      image:null
    },
    {
      image:null
    }
  ])

  const imgRef1 = useRef<HTMLInputElement | null>(null)
  const imgRef2 = useRef<HTMLInputElement | null>(null)
  
  return (
    <div className='mt-10'>
        <div className='flrx flex-wrap lg:flex-nowrap justify-between items-center'>

            {/* First block */}

            <div className='w-full lg:w-[500px] flex justify-center items-center flex-col'>
              <input type="file" className='hidden' ref={imgRef1}/>
                <div className='w-full flex justify-ceter items-center 
                rounded-md border border-dashed p-2 h-[300px]' onClick={()=> imgRef1?.current?.click()}>

                    <h1 className='flex item-center space-x-2 text-xl'>
                      <Upload></Upload>
                      <span>Upload File</span>
                    </h1>
                </div>
            </div>
            {/* VS Block */}
        <div className="flex w-full lg:w-auto justify-center items-center">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            VS
          </h1>
        </div>
            {/* Second block */}


            <div className='w-full lg:w-[500px] flex justify-center items-center flex-col'>
            <input type="file" className='hidden' ref={imgRef2}/>

                <div className='w-full flex justify-ceter items-center rounded-md border border-dashed p-2 h-[300px]' onClick={()=> imgRef2?.current?.click()}>

                    <h1 className='flex item-center space-x-2 text-xl'>
                      <Upload></Upload>
                      <span>Upload File</span>
                    </h1>
                </div>
            </div>
        </div>

        <div className="text-center mt-4">
        <Button className="w-52" >
          Submit
        </Button>
      </div>
      
    </div>
  )
}
