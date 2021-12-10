import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-elements'
import { BaseProps } from 'danholibraryrjs';

type Props = Omit<BaseProps, 'style'> & {
    error: Error
    style?: StyleProp<ViewStyle>
}

export default function Error({ error, style }: Props) {
    const { name, message, stack } = error;
    
    return (
        <View style={style}>
            <Text h1>{name}</Text>
            <Text h2>{message}</Text>
            <Text>{stack}</Text>
        </View>
    )
}
