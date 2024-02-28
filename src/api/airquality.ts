import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router()

const IQ_AIR_API_KEY = process.env.IQ_AIR_API_KEY;

type AirvisualResponse = {
  data?: {
    current?: {
      pollution?: {
        ts: string;
        aqius: number;
        mainus: string;
        aqicn: number;
        maincn: string;
      };
    };
  };
}

router.get('/pollution_by_coordinates', async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  try {
    if (!lat || !lon) {
      throw new Error('Latitude and longitude are required.');
    }

    const airvisualResponse = await axios.get<AirvisualResponse>(
      `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${IQ_AIR_API_KEY}`
    );

    const pollution = airvisualResponse.data?.data?.current?.pollution || {};

    res.send({ results: { pollution } });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(400).send({
      error: 'An error has occurred while fetching data',
    });
  }
});

export default router;