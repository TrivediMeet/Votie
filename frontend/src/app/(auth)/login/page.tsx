
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function login() {

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full md:w-[550px] shadow-md rounded-xl py-5 px-10 bg-white">
        <div>
          <h1 className="text-4xl text-center font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
            Clash
          </h1>
          <h1 className="text-3xl font-bold">Login</h1>
          <p>Welcome back</p>
          <form >
            <div className="mt-4">
                <label htmlFor="email">Email</label>
                <Input id="email" type="email" name="email" placeholder="Enter your email"></Input>
            </div>
            <div className="mt-4">
                <label htmlFor="password">Password</label>
                <Input id="password" type="password" name="password" placeholder="Enter your password"></Input>
            </div>
            <div className="text-right font-bold">
            <Link href="forget-password" className="text-right">Forget Password?</Link>

            </div>
            <div className="mt-4">
                <Button className="w-full">Submit</Button>
            </div>
          </form>

        </div>
       
        <p className="text-center mt-2">
          Don't have an account ?{" "}
          <strong>
            <Link href="/register">Register</Link>
          </strong>
        </p>
      </div>
    </div>
  );
}