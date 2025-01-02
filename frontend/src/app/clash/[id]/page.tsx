import { fetchClash } from "@/fetch/clashFetch";
import Navbar from "@/components/base/Navbar";
// import ViewClashItems from "@/components/clash/ViewClashItems";
import React from "react";
import Clashing from "@/components/clash/Clashing";

export default async function clashItems({
  params,
}: {
  params: { id: number };
}) {
  const clash: ClashType | null = await fetchClash(params.id);
  console.log(clash);
  return (
    <div className="container">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">{clash?.title}</h1>
        <p className="text-lg">{clash?.description}</p>
      </div>
      {clash && <Clashing clash={clash}></Clashing>}
    </div>
  );
}
