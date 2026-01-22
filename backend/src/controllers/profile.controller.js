import User from "../models/user.model.js";
import AuditLog from "../models/audit.model.js";

export const updateProfile = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  await user.save();

  await AuditLog.create({
    user: user._id,
    action: "PROFILE_UPDATED",
  });

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};
