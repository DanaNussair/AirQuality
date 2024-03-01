import { sequelize } from "../../db/connection";
import AirQuality, { createAirQualityRecord } from "../../db/models/airquality";

describe("AirQuality Model", () => {
    const airQualityArgs = {
        id: 1,
        city: "Paris",
        ts: "2024-02-24T13:00:00.000Z",
        aqius: 26,
        mainus: "o3",
        aqicn: 20,
        maincn: "o3",
    };

    beforeAll(async () => {
        await sequelize.sync(); // This will recreate the tables in the test database
    });

    afterAll(async () => {
        await sequelize.drop();
        await sequelize.close(); // Close the connection after all tests
    });

    it("should create a new air quality record", async () => {
        const aq = await AirQuality.create(airQualityArgs);

        expect(aq.city).toBe(airQualityArgs.city);
        expect(aq.aqius).toBe(airQualityArgs.aqius);
    });

    it("should not create a new air quality record if same ID is given", async () => {
        expect(() => AirQuality.create(airQualityArgs)).rejects.toThrow(
            "Validation error",
        );
    });

    it("should find added air quality record in database", async () => {
        const aq = await AirQuality.findOne({ where: { id: "1" } });

        expect(aq).toBeDefined();
        expect(aq.city).toBe(airQualityArgs.city);
    });

    it("should update air quality record", async () => {
        const aq = await AirQuality.findOne({ where: { id: "1" } });
        aq.city = "Amman";
        await aq.save();

        const updated_aq = await AirQuality.findOne({ where: { id: "1" } });

        expect(updated_aq).toBeDefined();
        expect(updated_aq.city).toBe("Amman");
    });

    it("should delete air quality record successfully", async () => {
        const aq = await AirQuality.findOne({ where: { id: "1" } });
        await aq.destroy();

        const deleted_aq = await AirQuality.findOne({ where: { id: "1" } });
        expect(deleted_aq).toBeNull();
    });

    it("createAirQualityRecord successfully creates a record", async () => {
        const aq = await createAirQualityRecord(airQualityArgs);

        expect(aq).toBeDefined();
        expect(aq.city).toEqual(airQualityArgs.city);
    });

    it("createAirQualityRecord fails to creates a record with missing params", async () => {
        await expect(() => createAirQualityRecord({ id: "2" })).rejects.toThrow(
            "Could not create new AirQuality record",
        );
    });
});
