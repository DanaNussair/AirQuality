import { callFunction } from "../helpers";
import { runFillParisPollutionJob } from "./fillDb";

const myModule = {
    runFillParisPollutionJob,
};

const functionName = process.argv[2] as keyof typeof myModule;
const selectedFunction = myModule[functionName];

callFunction(selectedFunction, functionName);
