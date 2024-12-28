import { Router } from "express";
import AuthRoutes from "./authRoutes.js";
import verifyRoutes from "./verifyRoutes.js";
import passwordRoutes from "./passwordRoutes.js";
const router = Router();
router.use("/api/auth", AuthRoutes);
router.use("/api/auth", passwordRoutes);
router.use("/", verifyRoutes);
export default router;
