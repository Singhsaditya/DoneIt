import express from "express";
import { signup, login, getMe, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/me", protect, getMe);

export default router;
