import { BaseProps } from 'danholibraryrjs'
import React from 'react'
import { StyleProp, StyleSheet, Text as BaseText, TextStyle } from 'react-native'
import { css } from '../../../config'

type Margin = string | number | {
    top?: string
    bottom?: string
    left?: string
    right?: string
}

type Props = BaseProps & {
    style?: StyleProp<TextStyle>
    value?: string,
    margin?: Margin
}

export default function Text({ children, style, value, margin }: Props) {
    return <BaseText style={[Styles.text, style, createMargin(margin ?? { bottom: '5%' })]}>{value || children}</BaseText>
}

const Styles = StyleSheet.create({ 
    text: { 
        color: css.color.primary,
    }
})
function createMargin(margin: Margin) {
    if (typeof margin === 'string' || typeof margin === 'number') {
        return StyleSheet.create({ value: { margin } }).value
    }
    else return StyleSheet.create({ value: {
        marginTop: margin.top,
        marginBottom: margin.bottom,
        marginLeft: margin.left,
        marginRight: margin.right
    }}).value;
}