"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
const react_1 = require("react");
const useInterval_1 = require("./useInterval");
function useLocalStorage(key, defaultState) {
    const isBrowser = (() => typeof window !== "undefined")();
    const [value, setValue] = (0, react_1.useState)(() => {
        if (isBrowser) {
            const value = localStorage.getItem(key);
            if (value)
                return JSON.parse(value);
        }
        return defaultState;
    });
    const setLocalStorage = (0, react_1.useCallback)((newValue) => {
        if (newValue === value)
            return;
        setValue(newValue);
        if (newValue === null) {
            localStorage.removeItem(key);
        }
        else {
            localStorage.setItem(key, JSON.stringify(newValue));
        }
    }, [value, setValue, key]);
    (0, useInterval_1.useInterval)(() => {
        if (isBrowser && localStorage.getItem(key) != JSON.stringify(value)) {
            const value = typeof localStorage !== "undefined" && localStorage.getItem(key);
            if (value)
                setValue(JSON.parse(value));
        }
    }, 1000);
    return [value, setLocalStorage];
}
exports.useLocalStorage = useLocalStorage;
//# sourceMappingURL=useLocalStorage.js.map