import * as resource from '../controllers/resourceController.js';
import * as tokenChecker from "../controllers/tokenChecker.js";
import express from 'express';
const resourceRouter = express.Router();

//categories for resources
resourceRouter.get('/get_categories', resource.getCategories);
resourceRouter.put('/edit_categories/', tokenChecker.loginCheck, tokenChecker.adminCheck, resource.editCategories);
resourceRouter.put('/edit_category', tokenChecker.loginCheck, tokenChecker.adminCheck, resource.editCategoryName, resource.editCategories);
resourceRouter.delete('/delete_category', tokenChecker.loginCheck, tokenChecker.adminCheck, resource.deleteCategory, resource.editCategories);

//resources
resourceRouter.get('/get_resource', resource.getResourceList);
resourceRouter.get('/get_resource/:id', resource.getResource);
resourceRouter.post('/create_resource', tokenChecker.loginCheck, tokenChecker.adminCheck, resource.createResource);
resourceRouter.delete('/delete_resource/:id', tokenChecker.loginCheck, tokenChecker.adminCheck, resource.removeResource);
resourceRouter.put('/edit_resource/:id', tokenChecker.loginCheck, tokenChecker.adminCheck, resource.editResource);

export default resourceRouter;