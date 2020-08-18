import * as user from '../controllers/userController.js';
import express from 'express';
const userRouter = express.Router();

//logging in
userRouter.post('/login', user.login);

//pages
userRouter.get('/get_page/', user.getPageList)
userRouter.get('/get_page/:page', user.getPage);

//FAQs
userRouter.get('/get_faq', user.getFAQList);
userRouter.get('/get_faq/:id', user.getFAQ);

export default userRouter;