import usersignupModel from '../model/usersignup.model.js';
import sendMail from '../jobs/sendemail.js';

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

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const otpExpire = Date.now() + 10 * 60 * 1000;  //valid for 10 min

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = otpExpire;
        await user.save();


        //await sendMail(email,
        //    'Verify Your Account',
        //    `<h2>Your Verification Code is: <strong>${otp}</strong></h2><p>Valid for 10 minutes.</p>`
        //)

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