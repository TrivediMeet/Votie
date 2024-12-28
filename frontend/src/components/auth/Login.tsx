"use client"
import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import  Link  from 'next/link';
import { SubmitButton } from '../common/SubmitButton';
import { useFormState } from 'react-dom';
import { loginAction } from '@/actions/authActions';
import { toast } from 'sonner';

import { signIn} from "next-auth/react" 

export default function Login()  {


    const initialState = {
      message: "",
      status: 0,
      errors: {},
      data:{}
    };
    const [state, formAction] = useFormState(loginAction, initialState);
    
    useEffect(() => {
        if (state.status === 500) {
          toast.error(state.message);
        } else if (state.status === 200) {
          toast.success(state.message);

          signIn("credentials",{
            email:state.data?.email,
            password:state.data?.password,
            redirect:true,
            callbackUrl:"/dashboard"
          })
        }
      }, [state]);
  return (
    <form action={formAction}>
    <div className="mt-4">
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" name="email" placeholder="Enter your email"></Input>
    </div>
    <span className="text-red-400">{state.errors?.email}</span>

    <div className="mt-4">
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" name="password" placeholder="Enter your password"></Input>
    </div>
    <span className="text-red-400">{state.errors?.password}</span>

    <div className="text-right font-bold">
    <Link href="forget-password" className="text-right">Forget Password?</Link>

    </div>
    <div className="mt-4">
        <SubmitButton></SubmitButton>
    </div>
  </form>
  )
}

