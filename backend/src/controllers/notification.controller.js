import Notification from "../models/notification.model.js";

export const getMyNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.json(notifications);
};

export const markAsRead = async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }

  if (notification.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }

  notification.read = true;
  await notification.save();

  res.json(notification);
};
