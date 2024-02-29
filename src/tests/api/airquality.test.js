import axios from "axios";
import { getPollutionByCoordinates } from "../../controllers/airquality_controller";

jest.mock("axios");

const request = {
    query: {
        lat: "100",
        lon: "100",
    },
};

const response = {
    status: jest.fn((x) => x),
    send: jest.fn((x) => x),
};

describe("AirQuality API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("/pollution_by_coordinates", () => {
        it("cannot have empty query params", async () => {
            await getPollutionByCoordinates({ query: {} }, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledTimes(1);
        });

        it("requires query param 'lat' to be provided", async () => {
            await getPollutionByCoordinates({ query: { lon: 100 } }, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledTimes(1);
        });

        it("requires query param 'lon' to be provided", async () => {
            await getPollutionByCoordinates({ query: { lat: 100 } }, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledTimes(1);
        });

        it("returns status 400 if API encounters any errors", async () => {
            const err = new Error("test error");
            axios.get.mockRejectedValue(err);
            await getPollutionByCoordinates(request, response);

            expect(response.status).toHaveBeenLastCalledWith(400);
            expect(response.send).toHaveBeenCalledTimes(1);
            expect(response.send).toHaveBeenCalledWith({
                error: "An error has occurred while fetching data",
            });
        });

        it("calls the airvisual/nearest_city API", async () => {
            axios.get.mockImplementationOnce(() => {
                return { data: {} };
            });
            await getPollutionByCoordinates(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.send).toHaveBeenCalledTimes(1);
        });

        it("returns correct object if external API is successful", async () => {
            axios.get.mockImplementationOnce(() => {
                return { data: { data: { current: { pollution: {} } } } };
            });
            await getPollutionByCoordinates(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.send).toHaveBeenCalledTimes(1);
            expect(response.send).toHaveBeenCalledWith({
                results: { pollution: {} },
            });
        });
    });
});
