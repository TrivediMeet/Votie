import { Router } from "express";
import { ZodError } from "zod";
import { formateError, imageValidator, removeImage, uploadFile, } from "../helper.js";
import { clashSchema } from "../validation/clashValidation.js";
import prisma from "../config/database.js";
const router = Router();
router.get("/", async (req, res) => {
    try {
        const clash = await prisma.clash.findMany({
            where: {
                user_id: req.user?.id,
            },
            orderBy: {
                id: "desc"
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
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const clash = await prisma.clash.findUnique({
            where: {
                id: Number(id),
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
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
export default router;
