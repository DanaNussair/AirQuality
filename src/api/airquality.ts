import express from "express";
import {
    getPollutionByCoordinates,
    getMostPollutedByCity,
} from "../controllers/airquality_controller";
const router = express.Router();

router.get("/pollution_by_coordinates", getPollutionByCoordinates);
router.get("/most_polluted_by_city", getMostPollutedByCity);

export default router;
