import React, { useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'

type Props = Omit<TextInputProps, 'onChange'> & {
    initialState?: number
    allowNegative?: boolean
    forceDoubleDigits?: boolean
    onChange?: (value: number) => void
};

export default function NumberInput({ initialState, allowNegative, forceDoubleDigits, style, placeholder, placeholderTextColor, onChange }: Props) {
    const toDoubleDigit = (val: string | number) => forceDoubleDigits && val.toString().length == 1 && `0${val}` || val.toString()

    const [value, setValue] = useState(initialState ?? 0);
    const [textValue, setTextValue] = useState(toDoubleDigit(value));

    return <TextInput 
        keyboardType="number-pad" 
        value={textValue} 
        onChangeText={str => {
            let v = parseInt(str);
            if (isNaN(v) && !allowNegative) v = !allowNegative ? value : -1;

            onChange?.(v);
            setTextValue(tv => v == value && tv != "" ? "" : toDoubleDigit(v))
            setValue(v)
        }}
        style={style} placeholder={placeholder} placeholderTextColor={placeholderTextColor}
    />
}