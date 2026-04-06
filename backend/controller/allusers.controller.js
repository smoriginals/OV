import usersignupModel from '../model/usersignup.model.js';

export default async function allUsersController(req, res) {

    const users = await usersignupModel.find({},
        {
            password: 0,
            verifyOtp: 0,
            verifyOtpExpireAt: 0,
            otpResendAt: 0
        }
    )
    return res.status(200).json({
        success: true,
        users
    })


}