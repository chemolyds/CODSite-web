import * as problem from '../controllers/problemController.js';
import express from 'express';
const problemRouter = express.Router();

problemRouter.get('/get_problem', problem.getProblemList);
problemRouter.get('/get_problem/:id', problem.getProblem);
problemRouter.post('/get_problem', problem.createProblem);
problemRouter.delete('/get_problem/:id', problem.removeProblem);
problemRouter.put('/get_problem/:id', problem.updateProblem);

export default problemRouter;