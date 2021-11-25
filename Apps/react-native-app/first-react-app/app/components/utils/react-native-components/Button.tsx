import { BaseProps } from 'danholibraryrjs'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Button as BaseButton, ButtonProps } from 'react-native-elements';

type BaseButtonTypes = 'solid' | 'clear' | 'outline';
type ButtonTypes = BaseButtonTypes & 'confirm' | 'cancel' | 'default'
type Props = BaseProps & Omit<ButtonProps, 'type'> & {
    type?: ButtonTypes
}

export default function Button({ type = 'default' }: Props) {
    return <BaseButton />
}

const Styles = StyleSheet.create({
    defaultStyle: {
        
    },
    confirm: {

    },
    cancel: {

    }
})