import AuditLog from "../models/audit.model.js";

export const getAuditLogs = async (req, res) => {
  const logs = await AuditLog.find()
    .sort({ createdAt: -1 })
    .populate("user", "name email role");

  res.json(logs);
};
