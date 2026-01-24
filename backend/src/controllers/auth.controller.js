import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/user.model.js";
import AuditLog from "../models/audit.model.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email: email.toLowerCase().trim(),
    password,
  });

  await AuditLog.create({
    user: user._id,
    action: "USER_SIGNUP",
  });

  res.status(201).json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  await AuditLog.create({
    user: user._id,
    action: "USER_LOGIN",
  });

  res.json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const getMe = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};

export const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;



    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({ message: "User not found" });

    }



    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto

      .createHash("sha256")

      .update(resetToken)

      .digest("hex");

    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;



    await user.save();



    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;



    await sendEmail({

      to: user.email,

      subject: "Reset your DoneIt password",

      html: `

        <h3>Password Reset</h3>

        <p>Click the link below to reset your password:</p>

        <a href="${resetUrl}">${resetUrl}</a>

        <p>This link expires in 15 minutes.</p>

      `,

    });



    res.json({ message: "Password reset email sent" });

  } catch (err) {

    console.error("FORGOT PASSWORD ERROR:", err);

    res.status(500).json({ message: "Forgot password failed" });

  }

};

export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ message: "Forgot password failed" });
  }
  }
