import { Dimensions } from "react-native";

const rgba = (red: number, green: number, blue: number, alpha: number = 1) => `rgba(${red}, ${green}, ${blue}, ${alpha})`;
const confirmValues = (alpha: number) => rgba(128, 255, 128, alpha);
const cancelValues = (alpha: number) => rgba(255, 100, 100, alpha);
const defaultAlpha = .8;
const defaultDisabled = .5

export const css = {
    backgroundColor: {
        primary: rgba(51, 51, 51),
        secondary: rgba(34, 34, 34),
        secondaryDisabled: rgba(34, 34, 34, defaultDisabled)
    },
    color: {
        primary: rgba(221, 221, 221),
        secondary: rgba(238, 238, 238),
        tertiary: rgba(150, 150, 150),
        dampen: rgba(255, 255, 255, .8),

        confirm: confirmValues(defaultAlpha),
        cancel: cancelValues(defaultAlpha),
        confirmDisabled: confirmValues(defaultDisabled),
        cancelDisabled: cancelValues(defaultDisabled),
        doing: rgba(252, 234, 136)
    }
}

export function getPercentage(value: number, percentage: number) {
    return Math.round(value / 100 * percentage);
}
export function useDimensions(dim: 'window' | 'screen' = 'window') {
    return Dimensions.get(dim);
}
