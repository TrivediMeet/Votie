import { Router } from "express";
import prisma from "../config/database.js";
import { authLimiter } from "../config/rate_limit.js";
import { ZodError } from "zod";
import { checkDateHourDiff, formateError, renderEmailEjs } from "../helper.js";
import { forgetPasswordschema, resetPasswrodschema } from "../validation/passwordValidation.js";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJobs.js";
const router = Router();
router.post("/forget-password", authLimiter, async (req, res) => {
    try {
        const body = req.body;
        const payload = forgetPasswordschema.parse(body);
        // * check the  user
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (!user || user === null) {
            res.status(422).json({
                message: "Invalid Data",
                errors: {
                    email: "No user found with this email.",
                },
            });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const token = await bcrypt.hash(uuid4(), salt);
        await prisma.user.update({
            data: {
                password_reset_token: token,
                token_send_at: new Date().toISOString(),
            },
            where: {
                email: payload.email,
            },
        });
        const url = `${process.env.CLIENT_APP_URL}/reset-password/?email=${payload.email}&token=${token}`;
        const html = await renderEmailEjs("forget-password", { url: url });
        await emailQueue.add(emailQueueName, {
            to: payload.email,
            subject: "Reset Password",
            body: html,
        });
        res.json({
            message: "Reset password link has been sent to your email. Check your email",
        });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formateError(error);
            res.status(422).json({ message: "Invalid data", errors });
            return;
        }
        else {
            console.error({ type: "Register Error", body: JSON.stringify(error) });
            res.status(500).json({
                error: "Something went wrong.please try again!",
                data: error,
            });
            return;
        }
    }
});
//* Reset password
router.post("/reset-password", async (req, res) => {
    try {
        const body = req.body;
        const payload = resetPasswrodschema.parse(body);
        // * check the  user // * check the  user
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (!user || user === null) {
            res.status(422).json({
                message: "Invalid Data",
                errors: {
                    email: "Link is not correct make sure you copied correct link",
                },
            });
            return;
        }
        // * check token
        if (user.password_reset_token !== payload.token) {
            res.status(422).json({
                message: "Invalid Data",
                errors: {
                    email: "Link is not correct make sure you copied correct link",
                },
            });
            return;
        }
        // check 2 hours frame
        const hoursDiff = checkDateHourDiff(user.token_send_at);
        if (hoursDiff > 2) {
            res.status(422).json({
                message: "Invalid Data",
                errors: {
                    email: "Link is expired",
                },
            });
            return;
        }
        // * update password
        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(payload.password, salt);
        await prisma.user.update({
            data: {
                password: newPass,
                password_reset_token: null,
                token_send_at: null
            },
            where: {
                email: payload.email
            }
        });
        res.json({
            message: "Password has been reset successfully. Please try to lonin now."
        });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formateError(error);
            res.status(422).json({ message: "Invalid data", errors });
            return;
        }
        else {
            console.error({ type: "Register Error", body: JSON.stringify(error) });
            res.status(500).json({
                error: "Something went wrong.please try again!",
                data: error,
            });
            return;
        }
    }
});
export default router;
