"use server"

import { REGISTER_URL } from "@/lib/apiEndPoints"
import axios, { AxiosError } from "axios"

export async function registerAction(prevState:any,formData: FormData) {


    
    try {

  const {data} =await axios.post(REGISTER_URL, formData);
    return {
        status: 200,
        message: data?.message ?? "Account created successfully. Please check your email to verify your account.",
        errors: {},
    }
} catch (error) {

    if(error instanceof AxiosError)
    {
        if(error.response?.status===422)
        {
            return {
                status: 422,
                message: error.response?.data?.message,
                errors: error.response?.data?.errors,
            };
        }
    }
    return{
        status: 500,
        message: "Something went wrong. Please try again!",
        errors: {},
    };
  }
  
}