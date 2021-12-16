import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { ButtonProps } from 'react-native-elements';
import { css } from '../../config';
import Button from './react-native-components/Button';

type Props = ButtonProps & {
    checked?: boolean
    title?: string
    onChange?: (value: boolean) => void
}

export default function Checkbox({ checked: initialState = false, title, style, onChange }: Props) {
    const [checked, setChecked] = useState(initialState);
    const _onChange = () => setChecked(v => {
        const state = !v;
        onChange?.(state);
        return state;
    })

    return <Button 
        icon={{ 
            name: checked ? 'check-box' : 'check-box-outline-blank', 
            color: css.color.primary 
        }} 
        onPress={_onChange} 
        title={title}
        style={{ justifyContent: 'flex-start', width: '100%', backgroundColor: 'unset' }}
    />
}