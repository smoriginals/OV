import express from 'express';
import userLoginController from '../controller/userlogin.controller.js';
const router = express.Router();

router.post('/login',userLoginController);

export default router;
