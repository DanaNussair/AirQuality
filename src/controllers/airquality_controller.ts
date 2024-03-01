import { Request, Response } from "express";

import { getErrorMessage } from "../helpers";
import { fetchDataFromAirVisualApi } from "./integrations_controller";

export const getPollutionByCoordinates = async (
    req: Request,
    res: Response,
) => {
    const { lat, lon } = req.query;

    try {
        if (!lat || !lon) {
            throw new Error("Latitude and longitude are required.");
        }
        const latString = typeof lat === "string" ? lat : lat.toString();
        const lonString = typeof lon === "string" ? lon : lon.toString();

        const airvisualResponse = await fetchDataFromAirVisualApi(
            "nearest_city",
            { lat: latString, lon: lonString },
        );

        const pollution = airvisualResponse?.current?.pollution || {};

        res.status(200);
        res.send({ results: { pollution } });
    } catch (error) {
        const message = getErrorMessage(error);
        console.error("Error fetching data:", message);
        res.status(400);
        res.send({
            error: "An error has occurred while fetching data",
        });
    }
};
