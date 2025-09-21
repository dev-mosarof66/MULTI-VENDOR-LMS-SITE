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
    getUser,
    refreshAcessToken,
    socialAuth,
} from "../controllers/user.controllers.js";

import middleware from "../middleware/middleware.js";
import upload from "../lib/multer.js";

const router = Router();

router.route('/register').post(registerUser) // tested
router.route('/verify-email/:id').post(verifyEmail) //tested
router.route('/login').post(loginUser) //tested
router.route('/refresh-token').post(refreshAcessToken) //tested
router.route('/update-profile').put(middleware, updateUser) //tested
router.route('/update-password').put(middleware, updatePassword) //tested
router.route('/logout').post(middleware, logout) //tested
router.route('/delete-profile').delete(middleware, deleteProfile) //tested
router.route('/update-avatar').put(middleware, upload.single("avatar"), updateAvatar) //tested
router.route('/me').get(middleware, getUser) //tested
router.route('/social-auth').post( socialAuth) //tested

export default router;
