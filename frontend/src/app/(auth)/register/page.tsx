import Link from "next/link";
import React from "react";


import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default async function register() {
 
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full px-10 md:w-[550px] shadow-md rounded-xl py-5 bg-white">
        <div>
          <h1 className="text-4xl text-center font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
            Clash
          </h1>
          <h1 className="text-3xl font-bold">Register</h1>
          <p>Start clashing now</p>
        </div>
        <form >
        <div className="mt-4">
                <label htmlFor="name">Name</label>
                <Input id="name" type="text" name="name" placeholder="Enter your name"></Input>
            </div>
            <div className="mt-4">
                <label htmlFor="email">Email</label>
                <Input id="email" type="email" name="email" placeholder="Enter your email"></Input>
            </div>
            <div className="mt-4">
                <label htmlFor="password">Password</label>
                <Input id="password" type="password" name="password" placeholder="Enter your password"></Input>
            </div>
            <div className="mt-4">
                <label htmlFor="cpassword">Confirm Password</label>
                <Input id="cpassword" type="password" name="confirm_password" placeholder="Confirm your password"></Input>
            </div>
            
          
            <div className="mt-4">
                <Button className="w-full">Submit</Button>
            </div>
          </form>
        <p className="text-center mt-2">
          Already have an account ?{" "}
          <strong>
            <Link href="/login">Login</Link>
          </strong>
        </p>
      </div>
    </div>
  );
}