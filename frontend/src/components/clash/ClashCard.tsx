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
import ClashCardMenu from "./ClashCardMenu";
import Link from "next/link";

function ClashCard({ clash, token }: { clash: ClashType; token: string }) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center flex-row">
        <CardTitle>{clash.title}</CardTitle>
        <ClashCardMenu clash={clash} token={token} />
      </CardHeader>
      <CardContent>
        {clash?.image && (
          <Image
            src={getImageUrl(clash.image)}
            width={500}
            height={500}
            alt={clash.title}
            className="rounded-md w-full h-[220px] object-contain"
          />
        )}
        <p>{clash.description}</p>
        <p>
          <strong>Expire At:</strong>
          {new Date(clash.expire_at).toDateString()}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/clash/items/${clash.id}`}>
          {" "}
          <Button>View in Detail</Button>{" "}
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ClashCard;
