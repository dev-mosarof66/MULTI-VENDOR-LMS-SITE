import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const emailReg = /^[a-z0-9]+(\.[a-z0-9]+)*@gmail\.com$/


const userSchema = new Schema({
    name: {
        type: String,
        required: [true,'please enter your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true,'please enter your email'],
        trim: true,
        unique: true,
        validate: {
            validator: function (value) {
                return emailReg.test(value)
            },
            message: "Invalid email address"
        }
    },
    password: {
        type: String,
        required: [true,'please enter your password'],
        length:[6,'Password must be at least 6 characters'],
        trim: true
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        url:String,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
}, { timestamps: true })


userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

userSchema.methods.comparePassword = function (plainPassword) {
    return bcrypt.compareSync(plainPassword, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User", userSchema);
export default User;