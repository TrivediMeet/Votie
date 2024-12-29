"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast, Toaster } from "sonner";
import { CLASH_URL } from "@/lib/apiEndPoints";
import { headers } from "next/headers";
import axios from "axios";
import { clearCashe } from "@/actions/CommonActions";

function DeleteClash({
  open,
  setOpen,
  id,
  token,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  token: string;
}) {
  const [loading, setLoading] = useState(false);

  const DeleteClash = async() => {
    try {
      setLoading(true);

      const {data} = await axios.delete(
        `${CLASH_URL}/${id}`, 
        { 
            headers:{
                Authorization: token
            }
         });

         if(data?.message)
         {
            setLoading(false)
            clearCashe("dashboard")
            toast.success(data.message)
         }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete your Clash form our DB permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={DeleteClash} disabled={loading}>
            {loading ? "Processing..." : "Yes Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteClash;
