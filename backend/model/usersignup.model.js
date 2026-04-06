import mongoose, { Schema } from "mongoose"

const userSignupModel = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/],
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0
    },
    isAccountVerify: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0
    },
    otpResendAt: {
        type: Number,
        default: 0
    },
    newSavePasswordRequest: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

export default mongoose.model("User", userSignupModel)