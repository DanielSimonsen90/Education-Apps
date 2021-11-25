import { BaseProps } from 'danholibraryrjs'
import React from 'react'
import { StyleProp, StyleSheet, Text as BaseText, TextStyle } from 'react-native'
import { css } from '../../../config'

type Props = BaseProps & {
    style?: StyleProp<TextStyle>
}

export default function Text({ children, style }: Props) {
    return <BaseText style={[Styles.text, style]}>{children}</BaseText>
}

const Styles = StyleSheet.create({ 
    text: { 
        color: css.color.primary
    }
})