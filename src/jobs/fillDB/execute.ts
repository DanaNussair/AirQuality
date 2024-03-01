import { callFunction } from "../helpers";
import * as myModule from "./fillDb";

const functionName = process.argv[2] as keyof typeof myModule;
const selectedFunction = myModule[functionName];

callFunction(selectedFunction, functionName);
