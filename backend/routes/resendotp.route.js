import express from 'express';
import resendOtpController from '../controller/resendotp.controller.js';
const router = express.Router();

router.post('/resend', resendOtpController);

export default router;