import Login from '@/components/auth/Login'
import ResetPassword from '@/components/auth/ResetPassword'
import React from 'react'

function page() {
  return (
    <div className="flex justify-center items-center h-screen ">
    <div className="w-full md:w-[550px] shadow-md rounded-xl py-5 px-10 bg-white">
      
        <h1 className="text-4xl text-center font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Clash
        </h1>
        <h1 className="text-3xl font-bold">Reset Passwrod</h1>
        <p>
            Reset Your Password
                </p>        

        <ResetPassword/>


     
    
    </div>
  </div>
  )
}

export default page
