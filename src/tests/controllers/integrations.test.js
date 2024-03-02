import axios from "axios";
import { fetchDataFromAirVisualApi } from "../../controllers/integrations_controller";

jest.mock("axios");

describe("integrations controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchDataFromAirVisualApi", () => {
        const args = {
            city: "paris",
            country: "france",
            state: "Ile-de-France",
        };

        it("successfully calls fetchDataFromAirVisualApi", async () => {
            axios.get.mockImplementationOnce(() => {
                return { data: { data: { current: { pollution: {} } } } };
            });
            const data = await fetchDataFromAirVisualApi("city", args);

            expect(data).toEqual({ current: { pollution: {} } });
        });

        it("throws error when fetchDataFromAirVisualApi fails", async () => {
            const err = new Error("test error");
            axios.get.mockRejectedValue(err);
            await expect(
                fetchDataFromAirVisualApi("city", args),
            ).rejects.toThrow("Failed to fetch data from airvisual api");
        });
    });
});
