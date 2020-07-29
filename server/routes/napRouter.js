import * as nap from '../controllers/napController.js';
import * as tokenChecker from "../controllers/tokenChecker.js";
import express from 'express';
const napRouter = express.Router();

//tokenChecker.loginCheck, tokenChecker.adminCheck, 
napRouter.get('/get_nap', nap.getNapList);
napRouter.get('/get_nap/:id', nap.getNap);
napRouter.post('/create_nap', nap.createNap);
napRouter.delete('/delete_nap/:id', nap.removeNap);
napRouter.put('/edit_nap/:id', nap.updateNap);

export default napRouter;