import User from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateVerificationCode from "../utils/code-generator.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { sendMail } from "../utils/send-mail.js";
import jwt from "jsonwebtoken";
import generateAccessAndRefreshTokens from "../utils/token-generator.js";
import cloudinary from "../lib/cloudinary.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new Error("All fields are required.");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new Error("This email is already in use.");
  }

  const user = { name, email, password };

  const verificationCode = generateVerificationCode(user);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const html = await ejs.renderFile(
    path.join(__dirname, "../views", "email-verification.ejs"),
    {
      name: user.name,
      code: verificationCode.code,
    }
  );

  const mail = await sendMail(user.email, "Email Verification", html);
  if (!mail) {
    throw new Error("Error while sending the mail.");
  }

  return res.status(201).json({
    success: true,
    message: `A verification email has been sent to ${user.email}. Please check your inbox.`,
    verificationLink: `${process.env.FRONTEND}/${verificationCode.redirectedLink}`,
  });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { code } = req.body;
  if (!code) throw new Error("Verification code is required.");

  const token = req.params.id;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) throw new Error("Verification time expired.");

  const { code: savedCode, user: savedUser } = decodedToken;
  if (code !== savedCode) throw new Error("Invalid verification code.");

  const user = new User({
    name: savedUser.name,
    email: savedUser.email,
    password: savedUser.password,
  });

  await user.save();
  const accessedUser = await User.findById(user._id).select("-password");

  return res.status(200).json({
    success: true,
    message: "Email verified successfully. You can login now.",
    user: accessedUser,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error("Email and password are required.");

  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials.");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new Error("Invalid credentials.");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = { httpOnly: true, secure: true, sameSite: "strict" };

  return res
    .status(200)
    .cookie("access_token", accessToken, {
      ...options,
      expires: new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 60 * 60 * 1000),
    })
    .cookie("refresh_token", refreshToken, {
      ...options,
      expires: new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRY * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message: "User logged in successfully",
      user: loggedInUser,
      accessToken,
    });
});

export const updateUser = asyncHandler(async (req, res) => {
  const id = req.user;
  if (!id) throw new Error("Login session expired.");

  const updates = req.body;
  if (!updates) throw new Error("At least one field is required to update.");
  if (updates.email) throw new Error("Email can't be updated.");

  const user = await User.findByIdAndUpdate(id, { $set: updates }, { new: true }).select("-password");

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

export const updatePassword = asyncHandler(async (req, res) => {
  const id = req.user;
  if (!id) throw new Error("Login session expired.");

  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) throw new Error("No changes noticed.");

  const user = await User.findById(id);
  if (!user) throw new Error("Invalid credentials.");

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) throw new Error("Invalid credentials.");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export const logout = asyncHandler(async (req, res) => {
  const id = req.user;
  if (!id) throw new Error("You are not logged in.");

  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .clearCookie("access_token", options)
    .clearCookie("refresh_token", options)
    .json({ success: true, message: "Logged out successfully" });
});

export const deleteProfile = asyncHandler(async (req, res) => {
  const id = req.user;
  if (!id) throw new Error("You are not logged in.");

  const user = await User.findById(id);
  if (!user) throw new Error("No user data found.");

  // Delete avatar from cloudinary if exists
  if (user.avatar) {
    const publicId = user.avatar.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  }

  await User.findByIdAndDelete(id);

  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .clearCookie("access_token", options)
    .clearCookie("refresh_token", options)
    .json({ success: true, message: "Profile deleted successfully" });
});

export const updateAvatar = asyncHandler(async (req, res) => {
  const id = req.user;
  if (!id) throw new Error("You are not logged in.");

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) throw new Error("Avatar file is required.");

  const avatar = await cloudinary.uploader.upload(avatarLocalPath, { folder: "avatars" });
  if (!avatar.url) throw new Error("Error while uploading avatar.");


  const user = await User.findById(id);
  if (user.avatar) {
    const publicId = user.avatar.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: { avatar: avatar.url } },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json({
    success: true,
    message: "Avatar updated successfully",
    user: updatedUser,
  });
});

export const updateRefreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refresh_token || req.body.refresh_token;
  if (!incomingRefreshToken) throw new Error("Unauthorized request.");

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);
    if (!user) throw new Error("Invalid refresh token.");

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new Error("Refresh token is expired or already used.");
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

    const options = { httpOnly: true, secure: true };

    return res
      .status(200)
      .cookie("access_token", accessToken, options)
      .cookie("refresh_token", newRefreshToken, options)
      .json({
        success: true,
        message: "Access token refreshed",
        accessToken,
        refreshToken: newRefreshToken,
      });
  } catch (error) {
    throw new Error(error?.message || "Invalid refresh token.");
  }
});

export const getUser = asyncHandler(async (req, res) => {
  const id = req.user;
  if (!id) throw new Error("You are not logged in.");

  const user = await User.findById(id).select("-password");
  if (!user) throw new Error("User not found.");

  return res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    user,
  });
});

