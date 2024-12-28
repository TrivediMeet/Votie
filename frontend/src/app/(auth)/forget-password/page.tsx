import ForgetPassword from '@/components/auth/ForgetPassword'
import Login from '@/components/auth/Login'
import React from 'react'

function page() {
  return (
    <div className="flex justify-center items-center h-screen ">
    <div className="w-full md:w-[550px] shadow-md rounded-xl py-5 px-10 bg-white">
      
        <h1 className="text-4xl text-center font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Clash
        </h1>
        <h1 className="text-3xl font-bold">Forget Passwrod</h1>
        <p>Don't Worry It happens just a enter your email below and we eill send you a passwrod reset link</p>
        

        <ForgetPassword></ForgetPassword>


     
    
    </div>
  </div>
  )
}

export default page
