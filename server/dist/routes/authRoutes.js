import { Router } from "express";
import { loginschema, registerSchema } from "../validation/authValidation.js";
import { ZodError } from "zod";
import { formateError, renderEmailEjs } from "../helper.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import jwt from "jsonwebtoken";
import { emailQueue, emailQueueName } from "../jobs/EmailJobs.js";
import prisma from "../config/database.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();
// * Login route
router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        const payload = loginschema.parse(body);
        // * check email
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (!user || user === null) {
            res.status(422).json({
                errors: {
                    message: "No user found with this email",
                },
            });
            return;
        }
        //* check password
        const compare = await bcrypt.compare(payload.password, user.password);
        if (!compare) {
            res.status(422).json({
                errors: {
                    message: "Invalid Credentials",
                },
            });
            return;
        }
        // * JWT payload
        let JWTpayload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        const token = jwt.sign(JWTpayload, process.env.SECRET_KEY, {
            expiresIn: "365d",
        });
        res.json({
            message: "Login successful",
            data: {
                ...JWTpayload,
                token: `Bearer ${token}`,
            },
        });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formateError(error);
            res.status(422).json({ message: "Invalid data", errors });
        }
        else {
            console.error({ type: "Register Error", body: JSON.stringify(error) });
            res
                .status(500)
                .json({ error: "Something went wrong.please try again!", data: error });
        }
    }
});
//* Login Check route
router.post("/check/credentials", async (req, res) => {
    try {
        const body = req.body;
        const payload = loginschema.parse(body);
        // * check email
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (!user || user === null) {
            res.status(422).json({
                errors: {
                    message: "No user found with this email",
                },
            });
            return;
        }
        //* check password
        const compare = await bcrypt.compare(payload.password, user.password);
        if (!compare) {
            res.status(422).json({
                errors: {
                    message: "Invalid Credentials",
                },
            });
            return;
        }
        res.json({
            message: "Login successful",
            data: {},
        });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formateError(error);
            res.status(422).json({ message: "Invalid data", errors });
        }
        else {
            console.error({ type: "Register Error", body: JSON.stringify(error) });
            res
                .status(500)
                .json({
                error: "Something went wrong.please try again!",
                data: error,
            });
        }
    }
});
// * Register route
router.post("/register", async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        const prisma = new PrismaClient();
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (user) {
            res.status(422).json({
                errors: {
                    message: "User already exists",
                },
            });
            return;
        }
        // encrypt the password
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
        const token = await bcrypt.hash(uuid4(), salt);
        const url = `${process.env.APP_URL}/verify-email/?email=${payload.email}&token=${token}`;
        console.log("The url is ", url);
        const html = await renderEmailEjs("email-verify", {
            name: payload.name,
            url: url,
        });
        await emailQueue.add(emailQueueName, {
            to: payload.email,
            subject: "Please verify your email Clash",
            body: html,
        });
        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                email_verify_token: token,
            },
        });
        res.json({ message: "User created successfully!" });
        return;
    }
    catch (error) {
        console.log("The error is ", error);
        if (error instanceof ZodError) {
            const errors = formateError(error);
            res.status(422).json({ message: "Invalid data", errors });
        }
        else {
            console.error({ type: "Register Error", body: JSON.stringify(error) });
            res
                .status(500)
                .json({ error: "Something went wrong.please try again!", data: error });
        }
    }
});
// * get user
router.get("/user", authMiddleware, async (req, res) => {
    const user = req.user;
    return res.json({
        data: user,
    });
});
export default router;
