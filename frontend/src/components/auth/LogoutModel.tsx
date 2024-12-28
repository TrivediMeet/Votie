"use client";

import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    
  } from "@/components/ui/alert-dialog"

  import {signOut} from "next-auth/react"
  

function LogoutModel({open,setOpen}:{open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>}) {

    
  const logOutUser = () =>{
    signOut({
       callbackUrl:"/login",
       redirect:true
    })

  }
  return (

    <AlertDialog open={open} onOpenChange={setOpen}>
    
    
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action will delete your current session and you have to Login again.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={logOutUser}>Yes Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  
  </AlertDialog>

  
  )
}

export default LogoutModel
