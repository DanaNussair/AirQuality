import { Response } from "express";
import { getErrorMessage } from "../helpers";

export type ApiResponse = {
    success?: boolean;
    data?: object;
    errorMessage?: string;
    status: number;
};

export const sendApiResponse = (
    res: Response,
    apiResponse: ApiResponse,
): void => {
    res.status(apiResponse.status);

    if (apiResponse.status === 200) {
        res.send({ results: apiResponse?.data });
    } else if ([400, 404].includes(apiResponse.status)) {
        res.send({
            error: apiResponse?.errorMessage,
        });
    } else res.send(apiResponse?.data);
};

export const handleApiError = (res: Response, error: Error | unknown): void => {
    const message = getErrorMessage(error);
    sendApiResponse(res, {
        status: 400,
        errorMessage: `An error occurred: ${message}`,
    });
};
