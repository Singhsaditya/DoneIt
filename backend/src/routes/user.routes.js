import express from "express";
import { getAllUsers, updateUserRole } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/", getAllUsers);
router.put("/:id/role", updateUserRole);


export default router;
