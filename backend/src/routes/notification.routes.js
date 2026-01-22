import express from "express";
import Notification from "../models/notification.model.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

// Get notifications for logged-in user
router.get("/", async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id })
    .sort({ createdAt: -1 });
  res.json(notifications);
});

// Mark all as read
router.put("/read", async (req, res) => {
  await Notification.updateMany(
    { user: req.user.id, read: false },
    { $set: { read: true } }
  );
  res.json({ message: "Notifications marked as read" });
});

export default router;
