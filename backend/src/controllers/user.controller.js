import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  // Prevent admin from changing their own role
  if (req.user._id.toString() === id) {
    return res
      .status(400)
      .json({ message: "You cannot change your own role" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.role = role;
  await user.save();

  const updatedUser = await User.findById(id).select("-password");
  res.json(updatedUser);
};
