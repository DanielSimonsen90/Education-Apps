import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { css } from '../config'


type Props = {
    style: StyleSheet.NamedStyles<{}>
}

export default function SidebarItem({ style }: Props) {
    return (
        <View style={style}>
            <Text style={styles.text}>Hello, World!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: css.color.primary
    }
})
