import { Dimensions } from "react-native";

export const css = {
    backgroundColor: {
        primary: "#333",
        secondary: "#222",

    },
    color: {
        primary: "#ddd",
        secondary: "#eee",
        dampen: "rgba(255, 255, 255, .8)",
        confirm: "rgba(128, 255, 128, .8)",
        cancel: "rgba(255, 100, 100, .8)"
    }
}

export function getPercentage(value: number, percentage: number) {
    return Math.round(value / 100 * percentage);
}
export function useDimensions(dim: 'window' | 'screen' = 'window') {
    return Dimensions.get(dim);
}
