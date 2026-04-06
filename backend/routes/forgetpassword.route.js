import express from 'express';
import forgetPasswordController from '../controller/forgetpassword.controller.js';

const router = express.Router();

router.post('/forget-password', forgetPasswordController);

export default router;