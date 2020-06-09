import * as user from '../controllers/userController.js';
import express from 'express';
const userRouter = express.Router();

//about
userRouter.get('/about', user.about);

//FAQs
userRouter.get('/get_faq', user.getFAQList);
userRouter.get('/get_faq/:id', user.getFAQ);

export default userRouter;