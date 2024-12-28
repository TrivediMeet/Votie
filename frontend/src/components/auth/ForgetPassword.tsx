"use client"
import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitButton } from '../common/SubmitButton';
import { useFormState } from 'react-dom';
import { forgectPasswordAction } from '@/actions/authActions';
import { toast } from 'sonner';


export default function ForgetPassword()  {


    const initialState = {
      message: "",
      status: 0,
      errors: {},
      
    };
    const [state, formAction] = useFormState(forgectPasswordAction, initialState);
    
    useEffect(() => {
        if (state.status === 500) {
          toast.error(state.message);
        } else if (state.status === 200) {
          toast.success(state.message);

         
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
        <SubmitButton></SubmitButton>
    </div>
  </form>
  )
}

