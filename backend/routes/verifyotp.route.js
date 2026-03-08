import express from 'express';
import verifyOtpController from '../controller/verifyotp.controller.js';

const router = express.Router();

router.post('/verify', verifyOtpController);

export default router