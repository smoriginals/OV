import userSignupModel from '../model/usersignup.model.js';
import bcrypt from 'bcryptjs';
import sendMail from '../jobs/sendemail.js';
//import jwt from 'jsonwebtoken';

export default async function usersignupController(req, res) {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            })
        }

        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!regexPassword.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain uppercase, lowercase and number'
            })
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format.'
            });
        }

        const existingUser = await userSignupModel.findOne({ $or: [{ email }, { username }] })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: `User Already Exist.`
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const otpExpire = Date.now() + 10 * 60 * 1000;  //valid for 10 min

        const newUser = new userSignupModel({
            username: username,
            email: email,
            password: hashPassword,
            verifyOtp: otp,
            verifyOtpExpireAt: otpExpire,
        })

        await newUser.save();
        //send otp to user Email

        //const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        //res.cookie('token', token, {
        //    httpOnly: true,
        //    secure: process.env.NODE_ENV === 'production',
        //    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        //    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        //})


        //await sendMail(email,
        //    'Verify Your Account',
        //    `<h2>Your Verification Code is: <strong>${otp}</strong></h2><p>Valid for 10 minutes.</p>`
        //)

        return res.status(201).json({
            success: true,
            message: 'OTP sent to your email',
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        })
    }
}