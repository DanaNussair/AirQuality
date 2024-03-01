import "dotenv/config";
import { ToadScheduler, SimpleIntervalJob, Task } from "toad-scheduler";
import axios from "axios";

import AirQuality from "../../db/models/airquality";
import { getErrorMessage } from "../../helpers";

const IQ_AIR_API_KEY: string | undefined = process.env.IQ_AIR_API_KEY;
const AIRVISUAL_API_URL: string = "http://api.airvisual.com/v2/city";

type AirVisualDataType = {
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

const createAirQualityRecord = (data: AirVisualDataType): AirQuality => {
    const pollution = data?.current?.pollution;

    return AirQuality.build({
        city: "Paris",
        ts: pollution?.ts,
        aqius: pollution?.aqius,
        mainus: pollution?.mainus,
        aqicn: pollution?.aqicn,
        maincn: pollution?.maincn,
    });
};

const fetchDataFromApi = async (): Promise<AirVisualDataType> => {
    const response = await axios.get(
        `${AIRVISUAL_API_URL}?city=paris&country=france&state=Ile-de-France&key=${IQ_AIR_API_KEY}`,
    );

    return response.data?.data;
};

const fillParisPollutionData = async (
    scheduler: ToadScheduler,
): Promise<void> => {
    try {
        const data = await fetchDataFromApi();
        const record = createAirQualityRecord(data);

        await record.save();
        console.log("Successfully created pollution record");
    } catch (error) {
        const message = getErrorMessage(error);
        console.log(message);
        //FIXME: Future possibility for adding a retry logic or logger of scheduler errors instead of stopping the scheduler
        scheduler.stop();
    }
};

export const runFillParisPollutionJob = (): void => {
    const scheduler = new ToadScheduler();
    const task = new Task("fillParisPollutionData", () =>
        fillParisPollutionData(scheduler),
    );
    const job = new SimpleIntervalJob(
        { minutes: 1, runImmediately: true },
        task,
    );

    scheduler.addSimpleIntervalJob(job);
};
