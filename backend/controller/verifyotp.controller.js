import usersignupModel from '../model/usersignup.model.js';
import jwt from 'jsonwebtoken';

export default async function verifyOtpController(req, res) {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email & OTP is required'
            })
        }
        const user = await usersignupModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            })
        }
        if (Date.now() > user.verifyOtpExpireAt) {
            
            return res.status(400).json({
                success: false,
                message:'OTP has Expired!'
            })
        }

        if (user.verifyOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            })
        }

        //Verifyed Account
        user.isAccountVerify = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        return res.status(201).json({ success: true, message: 'Account verified successfully!' });

    }
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: error.message || 'Server Error'
            }
        );
    }
}