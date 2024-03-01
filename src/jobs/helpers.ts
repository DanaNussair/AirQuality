export const callFunction = (
    selectedFunction: () => void,
    functionName: string,
) => {
    if (functionName) {
        if (typeof selectedFunction === "function") {
            console.log(`Executing ${functionName}`);
            selectedFunction();
        } else {
            console.error(`Function '${functionName}' not found.`);
        }
    } else {
        console.error(
            "Please provide a function name as a command-line argument.",
        );
    }
};
