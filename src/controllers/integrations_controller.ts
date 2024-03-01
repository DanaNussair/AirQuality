import "dotenv/config";
import axios from "axios";
import { getErrorMessage } from "../helpers";

const AIRVISUAL_API_KEY: string | undefined = process.env.AIRVISUAL_API_KEY;
const AIRVISUAL_HOST: string | undefined = process.env.AIRVISUAL_HOST;

export type AirVisualDataType = {
    current?: {
        pollution?: {
            ts?: string;
            aqius?: number;
            mainus?: string;
            aqicn?: number;
            maincn?: string;
        };
    };
};

export type AcceptedAirVisualArgs = {
    city?: string;
    country?: string;
    state?: string;
    lat?: string;
    lon?: string;
};

export const fetchDataFromAirVisualApi = async (
    baseUrl: string,
    args: AcceptedAirVisualArgs,
): Promise<AirVisualDataType> => {
    try {
        const response = await axios.get(`${AIRVISUAL_HOST}/${baseUrl}`, {
            params: { ...args, key: AIRVISUAL_API_KEY },
        });

        return response.data?.data;
    } catch (error) {
        const message = getErrorMessage(error);
        console.log(
            "Error occurred while fetching from airvisual api",
            message,
        );

        return {};
    }
};
