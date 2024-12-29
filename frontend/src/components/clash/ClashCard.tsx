"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Button } from "../ui/button";


function ClashCard({ clash }: { clash: ClashType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{clash.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {clash?.image && <Image

            src={getImageUrl(clash.image)}
            width={500}
            height={500}
            alt={clash.title}
            className="rounded-md w-full h-[220px] object-contain"
        />}
        <p>{clash.description}</p>
        <p>
            <strong>
                Expire At: 
            </strong>
            {new Date(clash.expire_at).toDateString()}
        </p>
      </CardContent>
      <CardFooter>
       <Button>View in Detail</Button>
      </CardFooter>
    </Card>
  );
}

export default ClashCard;
