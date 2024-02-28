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

  it('should find added air quality record in database', async () => {
    const aq = await AirQuality.findOne({ where: { id: '1' } });
    
    expect(aq).toBeDefined();
    expect(aq.city).toBe('Paris');
  });

  it('should update air quality record', async () => {
    const aq = await AirQuality.findOne({ where: { id: '1' } });
    aq.city = 'Amman';
    await aq.save();
    
    const updated_aq = await AirQuality.findOne({ where: { id: '1' } });

    expect(updated_aq).toBeDefined();
    expect(updated_aq.city).toBe('Amman');
  });

  it('should delete air quality record successfully', async () => {
    const aq = await AirQuality.findOne({ where: { id: '1' } });
    await aq.destroy();

    const deleted_aq = await AirQuality.findOne({ where: { id: '1' } });
    expect(deleted_aq).toBeNull();
  });
});
