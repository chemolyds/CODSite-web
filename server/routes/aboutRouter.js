import * as about from '../controllers/aboutController.js';
import * as tokenChecker from "../controllers/tokenChecker.js";
import express from 'express';
const aboutRouter = express.Router();

//abouts
aboutRouter.get('/get_about', about.getAboutList); //grabs all the abouts
aboutRouter.get('/get_about/:ID', about.getAbout); //grabs one about
aboutRouter.post('/add_about', tokenChecker.loginCheck, tokenChecker.adminCheck, about.createAbout);
aboutRouter.put('/edit_about/:ID', tokenChecker.loginCheck, tokenChecker.adminCheck, about.editAbout);
aboutRouter.delete('/delete_about/:ID', tokenChecker.loginCheck, tokenChecker.adminCheck, about.deleteAbout);

//subsections
aboutRouter.get('/get_subpage/:aboutID', about.getSubpageList); //grabs all subpages
aboutRouter.get('/get_subpage/:aboutID/:subpageID', about.getSubpage); //grabs one subpage
aboutRouter.post('/add_subpage/:aboutID', tokenChecker.loginCheck, tokenChecker.adminCheck, about.createSubpage);
aboutRouter.put('/edit_subpage/:aboutID/:subpageID', tokenChecker.loginCheck, tokenChecker.adminCheck, about.editSubpage);
aboutRouter.delete('/delete_subpage/:aboutID/:subpageID', tokenChecker.loginCheck, tokenChecker.adminCheck, about.deleteSubpage);

export default aboutRouter;