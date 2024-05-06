import { Router } from 'express';
import { getAllRate, rateCourse } from '../controllers/rate';
import VerifyToken from '../middlewares/user.middleware';

const rateApiRoute = new Router();

rateApiRoute.get('/getallrate', getAllRate);
rateApiRoute.post('/ratecourse', VerifyToken, rateCourse);

export default rateApiRoute;
