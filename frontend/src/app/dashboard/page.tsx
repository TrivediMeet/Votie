import Navbar from "@/components/base/Navbar";
import AddClash from "@/components/clash/AddClash";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchClashs } from "../fetch/clashFetch";
import ClashCard from "@/components/clash/ClashCard";

export default async function dashboard() {

  const session:CustomSession|null = await getServerSession(authOptions)
  
  const clashs:Array<ClashType> | [] = await fetchClashs(session?.user?.token!)
  
  // console.log("the clashes are ",clashs)
  return (
    <div className="container">
      <Navbar></Navbar>

      <div className="text-end mt-10">
        <AddClash user={session?.user!}></AddClash>
      </div>

      <div className="flex space-x-5 space-y-4 items-center flex-wrap">

        {clashs.length > 0 && clashs.map((item, index) => {
          return <ClashCard clash={item} key={index} />;
        })}
        
      </div>

    </div>
  );
}
