import React from 'react'
import { Pressable as BasePressable, PressableProps, StyleSheet, View } from 'react-native'

type BasePressableProps = PressableProps & React.RefAttributes<View>

export default function Pressable(props: BasePressableProps) {
    return <BasePressable {...props} />
}

export function PressableNoShow() {
    const Style = {
        cursor: 'none'
    }

    return <Pressable style={Style as any} />
}