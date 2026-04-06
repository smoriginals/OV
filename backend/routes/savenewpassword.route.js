import express from 'express';
import saveNewPasswordController from '../controller/savenewpassword.controller.js';
const router = express.Router();

router.post('/saving-ps', saveNewPasswordController);

export default router;