import express from 'express';
import usersignupController from '../controller/usersignup.controller.js';

const router = express.Router();

router.post('/signup', usersignupController);

export default router;