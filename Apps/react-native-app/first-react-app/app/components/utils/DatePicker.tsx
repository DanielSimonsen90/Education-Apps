import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { css } from '../../config';
import NumberInput from './NumberInput';

type OnChange<T> = (v: T) => void
type SetValue = (date: Date, value: number) => number

type Props = {
    onChange?: OnChange<Date>,
    initialState?: Date
}

export default function DatePicker({ initialState, onChange }: Props) {
    const [date, setDate] = useState(initialState ?? new Date());
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [hour, setHour] = useState(date.getHours());
    const [minute, setMinute] = useState(date.getMinutes());

    useEffect(() => {
        const date = new Date(year, month, day, hour, minute);
        onChange?.(date);
        setDate(date);
    })

    const createInputComponent = (value: number, type: string, setValue: SetValue, onChange: OnChange<number>) => (
        <NumberInput placeholderColor={css.color.dampen} placeholder={type}
            initialState={value}
            onChange={v => { 
                onChange(v);
                setDate(new Date(setValue(date, v)));
             }}
        />
    )

    return (
        <SafeAreaView style={[Styles.flex]}>
            <SafeAreaView style={[Styles.flex]}>
                {createInputComponent(year, 'Year', (d, v) => d.setFullYear(v), setYear)}
                {createInputComponent(month, 'Month', (d, v) => d.setMonth(v), setMonth)}
                {createInputComponent(day, 'Day', (d, v) => d.setDate(v), setDay)}
            </SafeAreaView>
            <SafeAreaView style={[Styles.flex]}>
                {createInputComponent(hour, 'Hour', (d, v) => d.setHours(v), setHour)}
                {createInputComponent(minute, 'Minute', (d, v) => d.setMinutes(v), setMinute)}
            </SafeAreaView>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    flex: {
        display: 'flex', flexDirection: 'column'
    }
})