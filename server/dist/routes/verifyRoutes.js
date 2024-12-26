import { Router } from "express";
import prisma from "../config/database.js";
const router = Router();
// * Verify email
router.get("/verify-email", async (req, res) => {
    const { email, token } = req.query;
    if (email && token) {
        const user = await prisma.user.findUnique({
            select: {
                email_verify_token: true,
                id: true,
            },
            where: { email: email },
        });
        if (user) {
            if (token === user.email_verify_token) {
                await prisma.user.update({
                    data: {
                        email_verified_at: new Date().toISOString(),
                        email_verify_token: null,
                    },
                    where: {
                        email: email,
                    },
                });
                res.redirect(`${process.env.CLIENT_APP_URL}/login`);
                return;
            }
            // * Check both token
            if (token !== user.email_verify_token) {
                return res.redirect("/verify/error");
                // return res.redirect(`${process.env.CLIENT_APP_URL}/login`);
            }
            await prisma.user.update({
                data: {
                    email_verified_at: new Date().toISOString(),
                    email_verify_token: null,
                },
                where: {
                    id: user.id,
                    email: email
                },
            });
            return res.redirect(`${process.env.CLIENT_APP_URL}/login`);
        }
        return res.redirect("/verify-error");
    }
});
// * Verify error page
router.get("/verify-error", (req, res) => {
    return res.render("auth/emailVerifyError");
});
export default router;
