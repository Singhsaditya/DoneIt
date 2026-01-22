import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(getTasks)
  .post(authorize("admin", "manager"), createTask);

router
  .route("/:id")
  .get(getTaskById)
  .put(authorize("admin", "manager"), updateTask)
  .delete(authorize("admin"), deleteTask);

export default router;
