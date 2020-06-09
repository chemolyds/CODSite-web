import * as problem from '../controllers/problemController.js';
import express from 'express';
const problemRouter = express.Router();

problemRouter.get('/get_problem', problem.getProblemList);
problemRouter.get('/get_problem/:name', problem.getProblem);

export default problemRouter;