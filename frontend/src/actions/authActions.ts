"use server";

import { CHECK_CREDENTIALS_URL, FORGET_PASSWORD_URL, LOGIN_URL, REGISTER_URL, RESET_PASSWORD_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";
export async function registerAction(prevState: any, formData: FormData) {
    try {
      const response = await axios.post(REGISTER_URL, {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
      });
  
      return {
        status: 200,
        // message: response.data.message,
        message: response.data?.message ?? "Acoount created successfully! Please check your email and verify your email",
        errors: {},
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error Response Data:", error.response?.data); // Debug the response
        if (error.response?.status === 422) {
          return {
            status: 422,
            message: error.response.data.message,
            errors: error.response.data.errors, // Pass errors to the frontend
          };
        }
      }
      return {
        status: 500,
        message: "Something went wrong. Please try again!",
        errors: {},
        data:{}
      };
    }
  }


  export async function loginAction(prevState: any, formData: FormData) {
    try {
      const response = await axios.post(CHECK_CREDENTIALS_URL, {
      
        email: formData.get("email"),
        password: formData.get("password"),
      });
  
      return {
        status: 200,
        message: response.data?.message ?? "Login successful.",
        errors: {},
        data:{
          email: formData.get("email"),
          password: formData.get("password"),
          
        }
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error Response Data:", error.response?.data); // Debug the response
        if (error.response?.status === 422) {
          return {
            status: 422,
            message: error.response.data.message,
            errors: error.response.data.errors, // Pass errors to the frontend
            data:{},
          
          };
        }
      }
      return {
        status: 500,
        message: "Something went wrong. Please try again!",
        errors: {},
        data:{}
      };
    }
  }


  export async function forgectPasswordAction(prevState: any, formData: FormData) {
    try {
      const response = await axios.post(FORGET_PASSWORD_URL, {
      
        email: formData.get("email"),
       
      });
  
      return {
        status: 200,
        message: response.data?.message ?? "We have emailed you a link to reset your password.",
        errors: {},
        
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error Response Data:", error.response?.data); // Debug the response
        if (error.response?.status === 422) {
          return {
            status: 422,
            message: error.response.data.message,
            errors: error.response.data.errors, // Pass errors to the frontend
           
          
          };
        }
      }
      return {
        status: 500,
        message: "Something went wrong. Please try again!",
        errors: {},
        
      };
    }
  }
  

  export async function resetPasswordAction(prevState: any, formData: FormData) {
    try {
      const response = await axios.post(RESET_PASSWORD_URL, {
       
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
        token: formData.get("token"),
      });
  
      return {
        status: 200,
        // message: response.data.message,
        message: response.data?.message ?? "Password Reset Successsful. Please Login now.",
        errors: {},
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error Response Data:", error.response?.data); // Debug the response
        if (error.response?.status === 422) {
          return {
            status: 422,
            message: error.response.data.message,
            errors: error.response.data.errors, // Pass errors to the frontend
          };
        }
      }
      return {
        status: 500,
        message: "Something went wrong. Please try again!",
        errors: {},
        data:{}
      };
    }
  }
  
  
