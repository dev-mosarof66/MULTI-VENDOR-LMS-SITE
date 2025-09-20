import { Router } from "express";
import {
    registerUser,
    verifyEmail,
    loginUser,
    updateUser,
    updatePassword,
    logout,
    deleteProfile,
    updateAvatar,
    updateRefreshToken,
} from "../controllers/user.controllers.js";

import middleware from "../middleware/middleware.js";
import upload from "../lib/multer.js";

const router = Router();

router.post("/register", registerUser);
router.post("/verify-email/:id", verifyEmail);
router.post("/login", loginUser);



router.post("/refresh-token",updateRefreshToken);
router.put("/update", middleware, updateUser);
router.put("/update-password", middleware, updatePassword);
router.post("/logout", middleware, logout);
router.delete("/delete-profile", middleware, deleteProfile);
router.put("/update-avatar", middleware, upload.single("avatar"), updateAvatar);

export default router;
