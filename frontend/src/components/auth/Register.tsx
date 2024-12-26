"use client";

import { registerAction } from "@/actions/authActions";
import { Input } from "@/components/ui/input";
import React from "react";
import { SubmitButton } from "../common/SubmitButton";
import { useFormState } from "react-dom";

const Register = () => {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };

  const [state, formAction] = useFormState(registerAction, initState);
  return (
    <form action={formAction}>
      <div className="mt-4">
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
        ></Input>

        <span className="text-red-500">{state.errors?.name}</span>
      </div>
      <div className="mt-4">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
        ></Input>
        <span className="text-red-500">{state.errors?.email}</span>
      </div>
      <div className="mt-4">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
        ></Input>
        <span className="text-red-500">{state.errors?.password}</span>
      </div>
      <div className="mt-4">
        <label htmlFor="cpassword">Confirm Password</label>
        <Input
          id="cpassword"
          type="password"
          name="confirm_password"
          placeholder="Confirm your password"
        ></Input>
        <span className="text-red-500">{state.errors?.confirm_password}</span>
      </div>

      <div className="mt-4">
        <SubmitButton></SubmitButton>
      </div>
    </form>
  );
};

export default Register;
