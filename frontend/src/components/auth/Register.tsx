"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../common/SubmitButton";
import { useFormState } from "react-dom";
import { registerAction } from "@/actions/authActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { REGISTER_URL } from "@/lib/apiEndPoints";

export default function Register() {
  const router = useRouter();
  const initialState = {
    message: "",
    status: 0,
    errors: {},
  };
  const [state, formAction] = useFormState(registerAction, initialState);

  // useEffect(() => {
  //   console.log("State Errors:", state.errors); 
  //   console.log("Making request to:", REGISTER_URL);// Debug errors
    
  // }, [state.errors]);
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
    <Label htmlFor="name">Name</Label>
    <Input placeholder="Type your name" name="name" />
    {state.errors?.name && (
      <span className="text-red-400">{state.errors.name}</span>
    )}
  </div>
  <div className="mt-4">
    <Label htmlFor="email">Email</Label>
    <Input placeholder="Type your email" name="email" />
    {state.errors?.email && (
      <span className="text-red-400">{state.errors.email}</span>
    )}
  </div>
  <div className="mt-4">
    <Label htmlFor="password">Password</Label>
    <Input
      type="password"
      placeholder="Type your password"
      name="password"
    />
    {state.errors?.password && (
      <span className="text-red-400">{state.errors.password}</span>
    )}
  </div>
  <div className="mt-4">
    <Label htmlFor="cpassword">Confirm Password</Label>
    <Input
      type="password"
      placeholder="Type your password"
      name="confirm_password"
    />
    {state.errors?.confirm_password && (
      <span className="text-red-400">{state.errors.confirm_password}</span>
    )}
  </div>
  <div className="mt-4">
    <SubmitButton />
  </div>
</form>

  );
}
