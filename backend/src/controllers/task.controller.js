import Task from "../models/task.model.js";
import AuditLog from "../models/audit.model.js";
import Notification from "../models/notification.model.js";

export const createTask = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    assignedTo,
    createdBy: req.user.id,
  });

  if (assignedTo) {
    await Notification.create({
      user: assignedTo,
      message: `You have been assigned a new task: ${title}`,
    });
  }

  await AuditLog.create({
    user: req.user.id,
    action: "TASK_CREATED",
    resource: task._id,
  });

  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  Object.assign(task, req.body);
  await task.save();

  await AuditLog.create({
    user: req.user.id,
    action: "TASK_UPDATED",
    resource: task._id,
  });

  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await task.deleteOne();

  await AuditLog.create({
    user: req.user.id,
    action: "TASK_DELETED",
    resource: task._id,
  });

  res.json({ message: "Task deleted successfully" });
};

export const getTasks = async (req, res) => {
  const query =
    req.user.role === "admin" || req.user.role === "manager"
      ? {}
      : { assignedTo: req.user.id };

  const tasks = await Task.find(query).populate("assignedTo", "name email");
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id).populate(
    "assignedTo",
    "name email"
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};
