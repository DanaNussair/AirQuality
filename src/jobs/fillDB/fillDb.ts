import "dotenv/config";
import { ToadScheduler, SimpleIntervalJob, Task } from "toad-scheduler";

import { createAirQualityRecord } from "../../db/models/airquality";
import { getErrorMessage } from "../../helpers";
import {
    AirVisualDataType,
    fetchDataFromAirVisualApi,
} from "../../controllers/integrations_controller";

const fillParisPollutionData = async (
    scheduler: ToadScheduler,
): Promise<void> => {
    try {
        const data: AirVisualDataType = await fetchDataFromAirVisualApi(
            "city",
            {
                city: "paris",
                country: "france",
                state: "Ile-de-France",
            },
        );
        const pollution = data?.current?.pollution;
        if (pollution) {
            await createAirQualityRecord({
                city: "Paris",
                ts: pollution?.ts,
                aqius: pollution?.aqius,
                mainus: pollution?.mainus,
                aqicn: pollution?.aqicn,
                maincn: pollution?.maincn,
            });

            console.log("Successfully created pollution record");
        } else console.error("No pollution data to be added");
    } catch (error) {
        const message = getErrorMessage(error);
        console.error(message);
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
