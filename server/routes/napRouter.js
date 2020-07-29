import * as nap from '../controllers/napController.js';
import * as tokenChecker from "../controllers/tokenChecker.js";
import express from 'express';
const napRouter = express.Router();

napRouter.get('/get_nap', nap.getNapList);
napRouter.get('/get_nap/:id', nap.getNap);
napRouter.post('/create_nap', tokenChecker.loginCheck, tokenChecker.adminCheck, nap.createNap);
napRouter.delete('/delete_nap/:id', tokenChecker.loginCheck, tokenChecker.adminCheck, nap.removeNap);
napRouter.put('/edit_nap/:id', tokenChecker.loginCheck, tokenChecker.adminCheck, nap.updateNap);

export default napRouter;