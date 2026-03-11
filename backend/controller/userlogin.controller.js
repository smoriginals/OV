import usersignupModel from '../model/usersignup.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export default async function userLoginController(req, res) {

    try {

        const { email, password } = req.body;

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

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email & Password is required'
            })
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await usersignupModel.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }


        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        return res.status(200).json({ success: true, message: 'Login successful!' });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        })
    }
}