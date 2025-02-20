// "use client";

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "../ui/button";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

// import { cn } from "@/lib/utils";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { CLASH_URL } from "@/lib/apiEndPoints";
// import axios, { AxiosError } from "axios";
// import { headers } from "next/headers";
// import { toast } from "sonner";

// function AddClash({ user }: { user: CustomUser }) {
//   const [open, setOpen] = useState(false);

//   const [clashData, setClashData] = useState<ClashFormType>({});

//   const [date, setDate] = React.useState<Date | null>();

//   const [image, setImage] = useState<File | null>(null);

//   const [loading, setLoading] = useState(false);

//   const [errors, setErrors] = useState<ClashFormTypeError>({});

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     console.log("here i am ")

//     if (file) {
//       setImage(file);

//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       setLoading(true);
//       const formData = new FormData();

//       formData.append("title", clashData?.title ?? "");
//       formData.append("description", clashData?.description ?? "");
//       formData.append("expire_at", date?.toISOString() ?? "");

//       if (image) {
//         formData.append("image", image);
//         console.log("here")
//       }

//       const { data } = await axios.post("http://localhost:8000/api/clash", formData, {
//         headers: {
//           Authorization: user.token
//         },

//       });

//       setLoading(false);
//       if (data?.message) {
//         setClashData({});
//         setDate(null);
//         setImage(null);
//         toast.success("Clash Added Successfully");
//         setOpen(false);
//       }
//     } catch (error) {
//       setLoading(false);
//       if (error instanceof AxiosError) {
//         if (error.response?.status === 422) {
//           setErrors(error.response?.data?.errors);
//         }
//       } else {
//         toast.error("Something went wrong. Please try again");
//       }
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button>Add Clash</Button>
//       </DialogTrigger>
//       <DialogContent onInteractOutside={(e) => e.preventDefault()}>
//         <DialogHeader>
//           <DialogTitle>Create Clash</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit}>
//           <div className="mt-4">
//             <Label htmlFor="title">Title</Label>
//             <Input
//               id="title"
//               placeholder="Enter your title here.. "
//               value={clashData?.title ?? ""}
//               onChange={(e) =>
//                 setClashData({ ...clashData, title: e.target.value })
//               }
//             ></Input>

//             <span className="text-red-500">{errors?.title}</span>
//           </div>

//           <div className="mt-4">
//             <Label htmlFor="title">Description</Label>
//             <Textarea
//               id="title"
//               placeholder="Enter your Description here.. "
//               value={clashData?.description ?? ""}
//               onChange={(e) =>
//                 setClashData({ ...clashData, description: e.target.value })
//               }
//             ></Textarea>
//             <span className="text-red-500">{errors?.description}</span>
//           </div>

//           <div className="mt-4">
//             <Label htmlFor="image">Image</Label>
//             <Input
//               id="image"
//               type="file"
//               placeholder="Enter your title here.. "
//               onAbort={handleImageChange}
//             ></Input>
//             <span className="text-red-500">{errors?.image}</span>
//           </div>

//           <div className="mt-4">
//             <Label htmlFor="expireAt" className="block">
//               ExpireAt
//             </Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant={"outline"}
//                   className={cn(
//                     "w-full mt-2 justify-start text-left font-normal",
//                     !date && "text-muted-foreground"
//                   )}
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}

//                   {date ? date.toDateString() : <span>Pick a date</span>}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   selected={date ?? new Date()}
//                   onSelect={setDate}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//             <span className="text-red-500">{errors?.expire_at}</span>

//           </div>

//           <div className="mt-4">
//             <Button className="w-full" disabled={loading}>
//               {loading ? "Processing.." : "Submit"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default AddClash;

"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios, { AxiosError } from "axios";
import { CLASH_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { clearCashe } from "@/actions/CommonActions";

export default function AddClash({ user }: { user: CustomUser }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = React.useState<Date | null>();
  const [clashData, setClashData] = useState<ClashFormType>({});
  const [errors, setErrors] = useState<ClashFormTypeError>();
  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", clashData?.title ?? "");
      formData.append("description", clashData?.description ?? "");
      formData.append("expire_at", date?.toISOString() ?? "");
      if (image) formData.append("image", image);

      const { data } = await axios.post(CLASH_URL, formData, {
        headers: {
          Authorization: user.token,
        },
      });
      setLoading(false);
      if (data?.message) {
        clearCashe("dashboard");
        setClashData({});
        setDate(null);
        setErrors({});
        setImage(null);
        toast.success(data?.message);
        setOpen(false);
      }
    } catch (error) {
      console.log("The error is ", error);
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          setErrors(error.response?.data?.errors);
        }
      } else {
        toast.error("Something went wrong.please try again!");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Clash</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="xl:max-h-[95vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Create Clash</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <Label htmlFor="Title">Title</Label>
            <Input
              placeholder="Type clash title"
              value={clashData?.title ?? ""}
              onChange={(e) =>
                setClashData({ ...clashData, title: e.target.value })
              }
            />
            <span className="text-red-500">{errors?.title}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="Description">Description</Label>
            <Textarea
              placeholder="Type clash description"
              value={clashData?.description ?? ""}
              onChange={(e) =>
                setClashData({ ...clashData, description: e.target.value })
              }
            />
            <span className="text-red-500">{errors?.description}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="name">Image</Label>
            <Input
              type="file"
              onChange={handleImage}
              placeholder="Type clash name"
            />
            <span className="text-red-500">{errors?.image}</span>
          </div>
          <div className="mt-4">
            <Label className="block">Choose Expiry date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full mt-2 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date ?? new Date()}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span className="text-red-500">{errors?.expire_at}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
