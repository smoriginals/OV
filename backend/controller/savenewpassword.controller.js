import usersignupModel from '../model/usersignup.model.js';

export default async function saveNewPasswordController(req, res) {


    //const { email, newPassword } = req.body;

    try {

        return res.status(200).json({
            success: true,
            message: 'Password has been updated successfully'
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });

    }

}