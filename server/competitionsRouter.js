import * as competitions from '../controllers/competitionsController.js';
import * as tokenChecker from "../controllers/tokenChecker.js";
import express from 'express';
const competitionsRouter = express.Router();

//competitions
competitionsRouter.get('/get_competitions', competitions.getCompetitionsList); //grabs all the competitions
competitionsRouter.get('/get_competitions/:ID', competitions.getCompetitions); //grabs one competitions
competitionsRouter.post('/add_competitions', tokenChecker.loginCheck, tokenChecker.adminCheck, competitions.createCompetitions);
competitionsRouter.put('/edit_competitions/:ID', tokenChecker.loginCheck, tokenChecker.adminCheck, competitions.editCompetitions);
competitionsRouter.delete('/delete_competitions/:ID', tokenChecker.loginCheck, tokenChecker.adminCheck, competitions.deleteCompetitions);

//subsections
competitionsRouter.get('/get_subpage/:competitionsID', competitions.getSubpageList); //grabs all subpages
competitionsRouter.get('/get_subpage/:competitionsID/:subpageID', competitions.getSubpage); //grabs one subpage
competitionsRouter.post('/add_subpage/:competitionsID', tokenChecker.loginCheck, tokenChecker.adminCheck, competitions.createSubpage);
competitionsRouter.put('/edit_subpage/:competitionsID/:subpageID', tokenChecker.loginCheck, tokenChecker.adminCheck, competitions.editSubpage);
competitionsRouter.delete('/delete_subpage/:competitionsID/:subpageID', tokenChecker.loginCheck, tokenChecker.adminCheck, competitions.deleteSubpage);

export default competitionsRouter;