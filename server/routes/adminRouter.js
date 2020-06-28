import * as admin from '../controllers/adminController.js';
import express from 'express';
const adminRouter = express.Router();

//about page
//adminRouter.post('/create_about', admin.createAbout); //only need it for initialization
//adminRouter.put('/edit_about', admin.editAbout);

//pages
adminRouter.post('/create_page', admin.createPage);
adminRouter.put('/edit_page/:page', admin.editPage);

//FAQs
adminRouter.post('/create_faq', admin.createFAQ);
adminRouter.put('/edit_faq/:id', admin.editFAQ);
adminRouter.delete('/delete_faq/:id', admin.deleteFAQ);

export default adminRouter;