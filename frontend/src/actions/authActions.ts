"use server";

import { REGISTER_URL } from "@/lib/apiEndPoints";
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
        message: response.data.message,
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
  
  
  
