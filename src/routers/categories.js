import express from 'express';
import { getAll } from '../controllers/categories.js';

const cateRouter = express.Router();

cateRouter.get('/', getAll);

export default cateRouter;
