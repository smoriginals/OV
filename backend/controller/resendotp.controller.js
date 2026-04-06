import usersignupModel from '../model/usersignup.model.js';
import sendMail from '../jobs/sendemail.js';
import bcrypt from 'bcryptjs';

export default async function resendOtpController(req, res) {

    const { email } = req.body;

    try {

        const user = await usersignupModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        if (user.isAccountVerify) {
            return res.status(400).json({
                success: false,
                message: 'Account already verified'

            })
        }


        if (Date.now() < user.otpResendAt) {
            return res.status(429).json({
                success: false,
                message: "Please wait before requesting another OTP"
            });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const hashOtp = await bcrypt.hash(otp, 10);
        const otpExpire = Date.now() + 10 * 60 * 1000;  //valid for 10 min


        user.verifyOtp = hashOtp;
        user.verifyOtpExpireAt = otpExpire;

        user.otpResendAt = Date.now() + 60 * 1000;  // allow resend after 1 min

        await user.save();

        await sendMail(email,
            'Verify Your Account',
            `<h2>Your Verification Code is: <strong>${otp}</strong></h2><p>Valid for 10 minutes.</p>`
        )

        return res.status(200).json({
            success: true,
            message:'OTP has been sent'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        })

    }

}