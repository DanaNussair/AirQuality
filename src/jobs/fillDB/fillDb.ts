export type MyModuleFunctions = {
    fillParisPollutionData: () => void;
};

export const fillParisPollutionData: MyModuleFunctions["fillParisPollutionData"] =
    () => {
        setInterval(() => {
            console.log("hello");
        }, 1000);
    };
