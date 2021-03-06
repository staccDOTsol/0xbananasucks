import { useState, useCallback } from "react";
import { useInterval } from "./useInterval";

export function useLocalStorage<T>(
  key: string,
  defaultState: T
): [T, (newValue: T) => void] {
  const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();
  const [value, setValue] = useState<T>(() => {
    if (isBrowser) {
      const value = localStorage.getItem(key);
      if (value) return JSON.parse(value) as T;
    }
    return defaultState;
  });

  const setLocalStorage = useCallback(
    (newValue: T) => {
      if (newValue === value) return;
      setValue(newValue);

      if (newValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    },
    [value, setValue, key]
  );

  useInterval(() => {
    if (isBrowser && localStorage.getItem(key) != JSON.stringify(value)) {
    const value =
      typeof localStorage !== "undefined" && localStorage.getItem(key);
      if (value) setValue(JSON.parse(value) as T);
    }
  }, 1000)

  return [value, setLocalStorage];
}
