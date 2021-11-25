import React from 'react'
import { View, StyleSheet } from 'react-native'
import Text from './utils/react-native-components/Text';

type Props = {
    style: StyleSheet.NamedStyles<{}>
}

export default function SidebarItem({ style }: Props) {
    return (
        <View style={style}>
            <Text>Hello, World!</Text>
        </View>
    )
}
