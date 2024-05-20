import { Router } from 'express';
import { getAllRate, getAllRateById, rateCourse } from '../controllers/rate.js';
import VerifyToken from '../middlewares/user.middleware.js';

const rateApiRoute = new Router();

rateApiRoute.get('/getallrate', getAllRate);
rateApiRoute.get('/getallratebyid/:id', getAllRateById);
rateApiRoute.post('/ratecourse', VerifyToken, rateCourse);

export default rateApiRoute;
