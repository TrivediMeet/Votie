import { Router } from "express";
import AuthRoutes from "./authRoutes.js";
import verifyRoutes from "./verifyRoutes.js";
import passwordRoutes from "./passwordRoutes.js";
import ClashRoutes from "./clashRoutes.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();

router.use("/api/auth", AuthRoutes);
router.use("/api/auth", passwordRoutes);
router.use("/", verifyRoutes);

router.use("/api/clash",ClashRoutes);

export default router;
