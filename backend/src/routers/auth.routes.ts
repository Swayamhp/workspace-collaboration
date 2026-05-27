import { Router } from "express";
import { login, refreshToken, register } from "../controllers/auth.controller";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login",login);
router.get("/refresh-token",refreshToken)

export default router;