import React, { useState } from 'react'
import { ColorValue, TextInput } from 'react-native'

type Props = {
    initialState?: number
    onChange?: (value: number) => void
    placeholder?: string
    placeholderColor?: ColorValue
}

export default function NumberInput({ initialState, placeholder, placeholderColor, onChange }: Props) {
    const [value, setValue] = useState(initialState ?? 0);

    return <TextInput 
        keyboardType="number-pad" 
        value={value.toString()} 
        onChangeText={str => {
            const v = parseInt(str);
            onChange?.(v);
            setValue(v)
        }}
        placeholder={placeholder} placeholderTextColor={placeholderColor}
    />
}
