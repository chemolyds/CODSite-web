import * as user from '../controllers/userController.js';
import express from 'express';
const userRouter = express.Router();

userRouter.get('/about', user.about);

export default userRouter;