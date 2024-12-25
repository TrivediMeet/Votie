import { Router } from "express";
import { registerSchema } from "../validation/authValidation.js";
import { ZodError } from "zod";
import { formateError } from "../helper.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const router = Router();
// * Register route
router.post("/register", async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        const prisma = new PrismaClient();
        let user = await prisma.user.findUnique({ where: {
                email: payload.email
            } });
        if (user) {
            return res.status(422).json({ errors: {
                    message: "User already exists"
                },
            });
        }
        // encrypt the password
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password
            }
        });
        return res.json({ message: "Account created successfully" });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formateError(error);
            return res
                .status(422)
                .json({ message: "Invalid data", errors });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
});
export default router;
