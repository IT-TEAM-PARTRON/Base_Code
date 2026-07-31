import express from "express";
import { login, logout } from "../controllers/auth/auth.controller.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/logout", logout);
//router.post("/refresh-token", refreshToken);

export default router;