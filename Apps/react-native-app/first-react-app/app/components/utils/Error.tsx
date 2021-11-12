import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'
// import { BaseProps } from 'danholibraryrjs';

type BaseProps = {
    style?: any
} //temp until DanhoLibraryRJS is okay
type Props = BaseProps & {
    error: Error
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
