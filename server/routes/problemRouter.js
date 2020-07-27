import * as problem from '../controllers/problemController.js';
import express from 'express';
const problemRouter = express.Router();

problemRouter.get('/get_problem', problem.getProblemList);
problemRouter.get('/get_problem/:name', problem.getProblem);
problemRouter.post('/get_problem', problem.createProblem);
problemRouter.delete('/get_problem/:name', problem.removeProblem);
problemRouter.put('/get_problem/:name', problem.updateProblem);

export default problemRouter;