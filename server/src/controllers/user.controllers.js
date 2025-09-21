import User from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateVerificationCode from "../utils/code-generator.js";
import fs from "fs";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { sendMail } from "../utils/send-mail.js";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";
import { redis } from "../db/redis.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((f) => !f?.trim())) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(409).json({ success: false, message: "This email is already in use." });
  }

  const user = { name, email, password };
  const verificationCode = generateVerificationCode(user);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const html = await ejs.renderFile(
    path.join(__dirname, "../views", "email-verification.ejs"),
    { name: user.name, code: verificationCode.code }
  );

  const mail = await sendMail(user.email, "Email Verification", html);
  if (!mail) {
    return res.status(500).json({ success: false, message: "Error while sending the mail." });
  }

  return res.status(201).json({
    success: true,
    message: `A verification email has been sent to ${user.email}. Please check your inbox.`,
    verificationLink: `${process.env.FRONTEND}/${verificationCode.redirectedLink}`,
  });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ success: false, message: "Verification code is required." });

  const token = req.params.id;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(400).json({ success: false, message: "Verification time expired or invalid token." });
  }

  const { code: savedCode, user: savedUser } = decodedToken;
  if (code !== savedCode) return res.status(400).json({ success: false, message: "Invalid verification code." });

  const newUser = new User({ name: savedUser.name, email: savedUser.email, password: savedUser.password });
  await newUser.save();

  const accessedUser = await User.findById(newUser._id).select("-password");

  return res.status(200).json({
    success: true,
    message: "Email verified successfully. You can login now.",
    user: accessedUser,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required." });


  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, message: "Invalid credentials." });

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) return res.status(401).json({ success: false, message: "Invalid credentials." });

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const loggedInUser = await User.findById(user._id).select("-password");


  const expire = process.env.REDIS_EXPIRY * 60;

  await redis.set(
    `user:${loggedInUser._id.toString()}`,
    JSON.stringify(loggedInUser),
    "EX",
    expire
  );



  return res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expiresIn: new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 60 * 60 * 1000),
    })
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expiresIn: new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRY * 60 * 60 * 1000),
    })
    .status(200)
    .json({ success: true, message: "User logged in successfully", user: loggedInUser });
});

export const updateUser = asyncHandler(async (req, res) => {
  const id = req.user;
  if (!id) return res.status(401).json({ success: false, message: "Login session expired." });

  const updates = req.body;
  if (!updates || Object.keys(updates).length === 0)
    return res.status(400).json({ success: false, message: "At least one field is required to update." });
  if (updates.email) return res.status(400).json({ success: false, message: "Email can't be updated." });

  const user = await User.findByIdAndUpdate(id, { $set: updates }, { new: true }).select("-password");

  const expire = process.env.REDIS_EXPIRY * 60;

  await redis.set(
    `user:${user._id.toString()}`,
    JSON.stringify(user),
    "EX",
    expire
  );

  return res.status(200).json({ success: true, message: "User updated successfully", user });
});

export const updatePassword = asyncHandler(async (req, res) => {
  const id = req.user;
  if (!id) return res.status(401).json({ success: false, message: "Login session expired." });

  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).json({ success: false, message: "No changes detected." });
  if (oldPassword === newPassword)
    return res.status(400).json({ success: false, message: "The password is similar to the old one." });

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ success: false, message: "No user data found." });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) return res.status(401).json({ success: false, message: "Invalid credentials." });

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({ success: true, message: "Password changed successfully" });
});

export const logout = asyncHandler(async (req, res) => {
  const id = req.user;
  if (!id) return res.status(401).json({ success: false, message: "You are not logged in." });

  const options = { httpOnly: true, secure: true };
  await redis.del(`user:${id.toString()}`);
  return res
    .status(200)
    .clearCookie("access_token", options)
    .clearCookie("refresh_token", options)
    .json({ success: true, message: "Logged out successfully" });
});

export const deleteProfile = asyncHandler(async (req, res) => {
  const id = req.user;
  if (!id) return res.status(401).json({ success: false, message: "You are not logged in." });

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ success: false, message: "No user data found." });

  if (user.avatar_public_id) {
    await cloudinary.uploader.destroy(user.avatar_public_id);
  }
  await redis.del(`user:${id.toString()}`);
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
  if (!id) return res.status(401).json({ success: false, message: "You are not logged in." });

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) return res.status(400).json({ success: false, message: "Avatar file is required." });

  const avatar = await cloudinary.uploader.upload(avatarLocalPath, { folder: "codemy" });
  fs.unlinkSync(avatarLocalPath);
  if (!avatar) return res.status(500).json({ success: false, message: "Error while uploading avatar." });

  const user = await User.findById(id).select("-password");
  if (!user) return res.status(404).json({ success: false, message: "No user data found." });

  if (user.avatar_public_id) {
    await cloudinary.uploader.destroy(user.avatar_public_id);
  }

  user.avatar_public_id = avatar?.public_id;
  user.avatar_url = avatar?.secure_url;

  await user.save({ validateBeforeSave: false });

  const expire = process.env.REDIS_EXPIRY * 60;

  await redis.set(
    `user:${user._id.toString()}`,
    JSON.stringify(user),
    "EX",
    expire
  );

  return res.status(200).json({ success: true, message: "Avatar updated successfully", user });
});

export const refreshAcessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.status(401).json({ success: false, message: "No refresh token found." });

  let decodedToken;
  try {
    decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.status(403).json({ success: false, message: "Refresh token expired or invalid. Please login again." });
  }

  const user = await User.findById(decodedToken?.id);
  if (!user) return res.status(401).json({ success: false, message: "Invalid access token." });

  const accessToken = user.generateAccessToken();

  return res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 60 * 60 * 1000),
    })
    .status(200)
    .json({ success: true, message: "Access token refreshed" });
});

export const getUser = asyncHandler(async (req, res) => {
  const id = req.user;
  if (!id) return res.status(401).json({ success: false, message: "You are not logged in." });

  let cachedUser = await redis.get(`user:${id.toString()}`);

  console.log('cached user : ', cachedUser)

  if (!cachedUser) cachedUser = await User.findById(id).select("-password");

  const user = JSON.parse(cachedUser);

  return res.status(200).json({ success: true, message: "User retrieved successfully", user });
});


// -------------------------------- SOCIAL LOGIN ----------------->

export const socialAuth = asyncHandler(async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({
      success: false,
      message: "Email, name, and providerId are required.",
    });
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({
      name,
      email,
      password: 'social_auth',
    });

    await user.save();
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const expire = process.env.REDIS_EXPIRY * 60;

  await redis.set(
    `user:${user._id.toString()}`,
    JSON.stringify(user),
    "EX",
    expire
  );

  return res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expiresIn: new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 60 * 60 * 1000),
    })
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expiresIn: new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRY * 60 * 60 * 1000),
    })
    .status(200)
    .json({
      success: true,
      message: "User login successfull",
      user,
    });
});
