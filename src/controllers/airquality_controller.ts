import { Request, Response } from "express";

import { fetchDataFromAirVisualApi } from "./integrations_controller";
import AirQuality, { fetchAirQualityRecord } from "../db/models/airquality";
import { handleApiError, sendApiResponse } from "./helpers";

export const getPollutionByCoordinates = async (
    req: Request,
    res: Response,
) => {
    const { lat, lon } = req.query;

    try {
        if (!lat || !lon) {
            sendApiResponse(res, {
                status: 400,
                errorMessage: "Latitude and longitude are required.",
            });
            return;
        }
        const latString = typeof lat === "string" ? lat : lat.toString();
        const lonString = typeof lon === "string" ? lon : lon.toString();

        const airvisualResponse = await fetchDataFromAirVisualApi(
            "nearest_city",
            { lat: latString, lon: lonString },
        );

        const pollution = airvisualResponse?.current?.pollution || {};

        sendApiResponse(res, { status: 200, data: { pollution } });
    } catch (error) {
        handleApiError(res, error);
    }
};

export const getMostPollutedByCity = async (req: Request, res: Response) => {
    const { city } = req.query;

    try {
        if (!city) {
            sendApiResponse(res, {
                status: 400,
                errorMessage: "City parameter is required",
            });
            return;
        }

        const record = await fetchAirQualityRecord(["ts"], {
            city: String(city),
            aqius: await AirQuality.max("aqius"),
        });

        if (record) {
            sendApiResponse(res, {
                status: 200,
                data: record,
            });
        }
        sendApiResponse(res, {
            status: 404,
            errorMessage: "Could not find record matching this criteria",
        });
    } catch (error) {
        handleApiError(res, error);
    }
};
