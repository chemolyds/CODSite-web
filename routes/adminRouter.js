import * as admin from '../controllers/adminController.js';
import express from 'express';
const adminRouter = express.Router();

adminRouter.post('/create_about', admin.createAbout)
adminRouter.put('/edit_about', admin.editAbout);

export default adminRouter;