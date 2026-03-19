import jwt from 'jsonwebtoken';

export default function Auth(req, res) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message:'Not Authorized'
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message:'Token Expired,Please Login.'
        })
    }
}