import express from 'express';
import { getPollutionByCoordinates } from '../controllers/airquality_controller';
const router = express.Router()

router.get('/pollution_by_coordinates', getPollutionByCoordinates);

export default router;