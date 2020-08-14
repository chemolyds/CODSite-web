import * as admin from '../controllers/adminController.js';
import * as tokenChecker from "../controllers/tokenChecker.js";
import express from 'express';
const adminRouter = express.Router();

adminRouter.use(tokenChecker.loginCheck, tokenChecker.adminCheck);

//users
adminRouter.get('/get_user', admin.getUserList);
adminRouter.get('/get_user/:id', admin.getUser);
adminRouter.post('/create_user', admin.createUser);
adminRouter.put('/edit_user/:id', admin.editUser);
adminRouter.delete('/delete_user/:id', admin.deleteUser);

//pages
adminRouter.post('/create_page', admin.createPage);
adminRouter.put('/edit_page/:page', admin.editPage);
adminRouter.get('/toggle_page/:page', admin.togglePage);

//FAQs
adminRouter.post('/create_faq', admin.createFAQ);
adminRouter.put('/edit_faq/:id', admin.editFAQ);
adminRouter.delete('/delete_faq/:id', admin.deleteFAQ);

export default adminRouter;