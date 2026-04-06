import usersignupModel from '../model/usersignup.model.js';
import bcrypt from 'bcryptjs';
import sendMail from '../jobs/sendemail.js';


export default async function forgetPasswordController(req, res) {

    const { email } = req.body;
    try {
        const user = await usersignupModel.findOne({ email });

        // Fix 1: Check user existence first, then verification separately
        if (!user || !user.isAccountVerify) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        // Fix 2: Actually enforce the cooldown before generating a new OTP
        if (user.otpResendAt && user.otpResendAt > Date.now()) {
            const secondsLeft = Math.ceil((user.otpResendAt - Date.now()) / 1000);
            return res.status(429).json({
                success: false,
                message: `Please wait ${secondsLeft}s before requesting again`
            });
        }

        const passwordRequest = await usersignupModel.findOne({ email: email, newSavePasswordRequest });

        if (passwordRequest) {

            return res.status(400).json({
                success: false,
                message: 'A password reset request is already pending. Please check your email.'
            });

        }


        const otp = String(Math.floor(100000 + Math.random() * 999999));
        const hashOtp = await bcrypt.hash(otp, 10);

        user.verifyOtp = hashOtp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;
        user.otpResendAt = Date.now() + 60 * 1000;

        await user.save();


        await sendMail(email,
            'Verify Your Account',
            `<h2>Your Verification Code is: <strong>${otp}</strong></h2><p>Valid for 10 minutes.</p>`
        )


        return res.status(200).json({
            success: true,
            message: 'OTP has been sent to your email',
          
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
}


