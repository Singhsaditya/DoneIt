import express from "express";
import { getAuditLogs } from "../controllers/audit.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/", getAuditLogs);

export default router;
