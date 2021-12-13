import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { css } from '../../config';
import NumberInput from './NumberInput';

type OnChange<T> = (v: T) => void
type SetValue = (date: Date, value: number) => number

type Props = {
    initialState?: Date,
    onChange?: OnChange<Date>,
}

export default function DatePicker({ initialState, onChange }: Props) {
    const [date, setDate] = useState(initialState || new Date());
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [hour, setHour] = useState(date.getHours());
    const [minute, setMinute] = useState(date.getMinutes());

    useEffect(() => {
        const date = new Date(year, month, day, hour, minute);
        onChange?.(date);
        setDate(date);
    }, [day, month, year, hour, minute])

    const createInputComponent = (value: number, type: string, setValue: SetValue, onChange: OnChange<number>) => (
        <NumberInput style={Styles.inputStyle} forceDoubleDigits={true}
            placeholderTextColor={css.color.dampen} placeholder={type} 
            initialState={value} allowNegative={false}
            onChange={v => {
                onChange(v);
                setDate(new Date(setValue(date, v)));
             }}
        />
    )

    return (
        <SafeAreaView style={[Styles.flex, Styles.goWide]}>
            <SafeAreaView style={Styles.flex}>
                {createInputComponent(day, 'Day', (d, v) => d.setDate(v), setDay)}
                {createInputComponent(month, 'Month', (d, v) => d.setMonth(v), setMonth)}
                {createInputComponent(year, 'Year', (d, v) => d.setFullYear(v), setYear)}
            </SafeAreaView>
            <SafeAreaView style={Styles.flex}>
                {createInputComponent(hour, 'Hour', (d, v) => d.setHours(v), setHour)}
                {createInputComponent(minute, 'Minute', (d, v) => d.setMinutes(v), setMinute)}
            </SafeAreaView>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    flex: {
        display: 'flex', justifyContent: 'center' , flexDirection: 'row', width: '50%'
    },
    goWide: {
        width: '100%'
    },
    inputStyle: {
        color: css.color.primary, minWidth: 5, maxWidth: 35, flexGrow: 1, flexShrink: 1
    }
})