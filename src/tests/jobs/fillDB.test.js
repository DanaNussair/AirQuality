import axios from "axios";
import { ToadScheduler } from "toad-scheduler";
import { fillParisPollutionData } from "../../jobs/fillDB/fillDb";
import AirQuality from "../../db/models/airquality";
import { sequelize } from "../../db/connection";

jest.mock("axios");

describe("fillDB", () => {
    const scheduler = new ToadScheduler();

    beforeAll(async () => {
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.drop();
        await sequelize.close();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("fillParisPollutionData failure", () => {
        beforeEach(async () => {
            const err = new Error("test error");
            axios.get.mockRejectedValue(err);
        });
        it("fails when fetchDataFromAirVisualApi fails", async () => {
            const consoleSpy = jest
                .spyOn(console, "error")
                .mockImplementation(() => {});
            await fillParisPollutionData(scheduler);

            expect(consoleSpy).toHaveBeenCalled();
        });

        it("fails to insert record into AirQuality table when API fails", async () => {
            const aq = await AirQuality.findOne({ city: "Paris" });
            const consoleSpy = jest
                .spyOn(console, "error")
                .mockImplementation(() => {});
            await fillParisPollutionData(scheduler);

            expect(axios.get).toHaveBeenCalled();
            expect(aq).toBeNull();
            expect(consoleSpy).toHaveBeenCalled();
        });
    });

    describe("fillParisPollutionData sucess", () => {
        beforeEach(async () => {
            axios.get.mockImplementationOnce(() => {
                return {
                    data: { data: { current: { pollution: {} } }, status: 200 },
                };
            });

            await fillParisPollutionData(scheduler);
        });

        it("successfully calls fetchDataFromAirVisualApi", async () => {
            expect(axios.get).toHaveBeenCalled();
            expect(axios.get.mock.results[0].value).toEqual({
                data: { data: { current: { pollution: {} } }, status: 200 },
            });
        });

        it("successfully inserts records into AirQuality table", async () => {
            const aq = await AirQuality.findOne({ city: "Paris" });

            expect(aq).toBeDefined();
            expect(aq.city).toEqual("Paris");
        });
    });
});
