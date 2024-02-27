import { sequelize } from '../../db/connection';
import AirQuality from '../../db/models/airquality';

describe('AirQuality Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // This will recreate the tables in the test database
  });

  afterAll(async () => {
    await sequelize.close(); // Close the connection after all tests
  });

  it('should create a new air quality record', async () => {
    const aq = await AirQuality.create({
        id: 1,
        city: 'Paris',
        ts: "2024-02-24T13:00:00.000Z",
        aqius: 26,
        mainus: "o3",
        aqicn: 20,
        maincn: "o3"
    });

    expect(aq.city).toBe('Paris');
    expect(aq.aqius).toBe(26);
  });
});
