import { Router } from "express";
import { ZodError } from "zod";
import { formateError, imageValidator, removeImage, uploadFile, } from "../helper.js";
import { clashSchema } from "../validation/clashValidation.js";
import prisma from "../config/database.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();
router.get("/", authMiddleware, async (req, res) => {
    try {
        const clash = await prisma.clash.findMany({
            where: {
                user_id: req.user?.id,
            },
            orderBy: {
                id: "desc"
            },
        });
        res.json({ message: "Clash Fetched Successfully", data: clash });
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
        return;
    }
});
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const clash = await prisma.clash.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                ClashItem: {
                    select: {
                        image: true,
                        id: true,
                        count: true
                    },
                },
                ClashComments: {
                    select: {
                        id: true,
                        comment: true,
                        created_at: true,
                    },
                    orderBy: {
                        id: "desc"
                    }
                }
            }
        });
        res.json({ message: "Clash Fetched Successfully", data: clash });
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
        return;
    }
});
router.post("/", authMiddleware, async (req, res) => {
    try {
        const body = req.body;
        const payload = clashSchema.parse(body);
        // * Check if files exist
        if (req.files?.image) {
            const image = req.files?.image;
            const validMsg = imageValidator(image.size, image.mimetype);
            if (validMsg) {
                res.status(422).json({ errors: { image: validMsg } });
                return;
            }
            payload.image = (await uploadFile(image)) || "";
        }
        else {
            res.status(422).json({ errors: { image: "Image feild is required" } });
            return;
        }
        await prisma.clash.create({
            data: {
                title: payload.title,
                description: payload?.description,
                image: payload?.image,
                user_id: req.user?.id,
                expire_at: new Date(payload.expire_at),
            },
        });
        res.json({ message: "Clash created successfully" });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formateError(error);
            res.status(422).json({ message: "Invalid data", errors });
        }
        else {
            res
                .status(500)
                .json({ error: "Something went wrong.please try again!", data: error });
        }
    }
});
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const payload = clashSchema.parse(body);
        // * Check if files exist
        if (req.files?.image) {
            const image = req.files?.image;
            const validMsg = imageValidator(image.size, image.mimetype);
            if (validMsg) {
                res.status(422).json({ errors: { image: validMsg } });
                return;
            }
            // * Get Old Image Name
            const clash = await prisma.clash.findUnique({
                select: {
                    image: true,
                    id: true,
                },
                where: {
                    id: Number(id),
                },
            });
            if (clash) {
                removeImage(clash?.image);
            }
            payload.image = await uploadFile(image);
        }
        await prisma.clash.update({
            where: { id: Number(id) },
            data: {
                ...payload,
                expire_at: new Date(payload.expire_at),
            },
        });
        res.json({ message: "Clash Updated successfully" });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formateError(error);
            res.status(422).json({ message: "Invalid data", errors });
        }
        else {
            res
                .status(500)
                .json({ error: "Something went wrong.please try again!", data: error });
        }
    }
});
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        // * Get Old Image Name
        const clash = await prisma.clash.findUnique({
            select: {
                image: true,
                id: true,
            },
            where: {
                id: Number(id),
            },
        });
        if (clash) {
            removeImage(clash?.image);
        }
        await prisma.clash.delete({
            where: {
                id: Number(id),
            },
        });
        res.json({ message: "Clash Deleted Successfully" });
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
        return;
    }
});
// * Clash Item Routes
// router.post("/items",authMiddleware,async(req:Request,res:Response)=>{
//   const {id} = req.body;
//   const files:FileArray | null| undefined = req.files
//   let imgErrors:Array<string> = []
//   const images = files?.["images[]"] as UploadedFile[]
//   if(images.length>= 2)
//   {
//     // * check validations
//     images.map((img)=>{
//       const validMsg = imageValidator(img?.size,img?.mimetype)
//       if(validMsg)
//       {
//         imgErrors.push(validMsg)
//       }
//     })
//     if(imgErrors.length>0)
//     {
//       res.status(422).json({errors:imgErrors})
//       return
//     }
//     //* Upload Images to items
//     let uploadedImages:string[] = []
//     images.map((img)=>{
//       uploadedImages.push(uploadFile(img) )
//     })
//     // * Save Images to Database
//     uploadedImages.map(async (item) =>{
//       await prisma.clashItem.create({
//         data:{
//           image:item,
//           clash_id:Number(id),
//         }
//       })
//     })
//      res.status(200).json({message:"Clash Items Uploaded Successfully"})
//      return
//   }
//    res.status(422).json({errors:["Please Select at least two images for Clshing"]})
//    return
// })
router.post("/items", authMiddleware, async (req, res) => {
    try {
        const { id } = req.body;
        const files = req.files;
        let imgErros = [];
        const images = files?.["images[]"];
        if (images.length >= 2) {
            // * Check validation
            images.map((img) => {
                const validMsg = imageValidator(img?.size, img?.mimetype);
                if (validMsg) {
                    imgErros.push(validMsg);
                }
            });
            if (imgErros.length > 0) {
                res.status(422).json({ errors: imgErros });
                return;
            }
            // * Upload images to items
            let uploadedImages = [];
            images.map((img) => {
                uploadedImages.push(uploadFile(img));
            });
            uploadedImages.map(async (item) => {
                await prisma.clashItem.create({
                    data: {
                        image: item,
                        clash_id: Number(id),
                    },
                });
            });
            res.json({ message: "Clash Items updated successfully!" });
            return;
        }
        res
            .status(404)
            .json({ message: "Please select at least 2 images for clashing." });
        return;
    }
    catch (error) {
        // logger.error({ type: "Clash Item", body: JSON.stringify(error) });
        res
            .status(500)
            .json({ message: "Something went wrong.please try again" });
        return;
    }
});
export default router;
