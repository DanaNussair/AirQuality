import axios from 'axios';
import { getPollutionByCoordinates } from '../../controllers/airquality_controller';

jest.mock('axios')

const request = {
    query: {
        lat: '100',
        lon: '100'
    }
}

const response = {
    status: jest.fn((x) => x),
    send: jest.fn((x) => x),
}

describe('AirQuality API', () => {
    describe('/pollution_by_coordinates', () =>{ 
        it('calls the airvisual/nearest_city API', async () => {
            axios.get.mockImplementationOnce(() => { return { data: {} }})
            await getPollutionByCoordinates(request, response)
            expect(response.status).toHaveBeenCalledWith(200)
            expect(response.send).toHaveBeenCalledTimes(1)
        })
    })
})