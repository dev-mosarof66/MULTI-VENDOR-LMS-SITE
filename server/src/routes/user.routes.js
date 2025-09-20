import { Router } from "express";
import { registerUser, verifyEmail } from "../controllers/user.controllers.js";

const router = Router()

router.route('/register').post(registerUser)
router.route('/verify-email/:id').post(verifyEmail)

export default router