import usersignupModel from '../model/usersignup.model.js';

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
        if (user.verifyOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            })
        }

        if (Date.now() > user.verifyOtpExpireAt) {
            
            return res.status(400).json({
                success: false,
                message:'OTP has Expired!'
            })
        }
        //Verifyed Account
        user.isAccountVerify = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

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