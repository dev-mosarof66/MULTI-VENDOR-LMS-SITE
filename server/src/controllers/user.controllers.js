import User from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateVerificationCode from "../utils/code-generator.js";
import ejs, { name } from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url';
import { sendMail } from "../utils/send-mail.js";
import jwt from 'jsonwebtoken'

export const registerUser = await asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new Error("All fields are required.");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new Error("This email already in use.");
    }

    const user = {
        name,
        email,
        password,
    }

    const verificationCode = generateVerificationCode(user);
    const __filename = fileURLToPath(import.meta.url);
    const __diranme = path.dirname(__filename);
    const html = await ejs.renderFile(
        path.join(
            __diranme, '../views', 'email-verification.ejs'
        ),
        {
            name: user.name,
            code: verificationCode.code
        }
    )

    const mail = await sendMail(user.email, 'Email Verification', html)

    if (!mail) {
        throw new Error("Error while sending the mail.");
    }



    return res.status(201).json({
        success: true,
        message: `A verification email has been sent to this ${user.email}. Plase check your inbox.`,
        varificationLink: `${process.env.FRONTEND}/${verificationCode.redirectedLink}`
    })
})

export const verifyEmail = await asyncHandler(async (req, res) => {

    const { code } = req.body;

    if (!code) {
        throw new Error("Verification code is required.");
    }

    const token = req.params.id;

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
        throw new Error("Verification time expired.");
    }

    const { code: savedCode, user: savedUser } = await decodedToken


    if (code != savedCode) {
        throw new Error("Invalid verification code.");
    }

    const user = await User({
        name: savedUser.name,
        email: savedUser.email,
        password: savedUser.password
    })


    if (!user) {
        throw new Error("Eror while creating new user.");
    }


    await user.save();

    const accesedUser = await User.findById(user._id).select("-password");

    return res.status(200).json({
        success: true,
        message: "Email verified successfully.You can login now.",
        user: accesedUser
    })
})