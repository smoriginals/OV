import express from 'express';
import allUsersController from '../controller/allusers.controller.js';

const router = express.Router();

router.get('/accounts', allUsersController);

export default router;