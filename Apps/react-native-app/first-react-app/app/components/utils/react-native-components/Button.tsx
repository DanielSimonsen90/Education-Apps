import { BaseProps } from 'danholibraryrjs'
import React from 'react'
import { SafeAreaView, StyleSheet, TextStyle } from 'react-native';
import { Button as BaseButton, ButtonProps, colors, Icon } from 'react-native-elements'
import { css } from '../../../config';
import Pressable from './Pressable';
import Text from './Text';

type BaseButtonTypes = 'solid' | 'clear' | 'outline';
type ButtonTypes = BaseButtonTypes | 'confirm' | 'cancel' | 'default'
type ButtonStyle = TextStyle | typeof Styles.defaultStyle;
type Props = BaseProps<false> & Omit<ButtonProps, 'type'> & {
    type?: ButtonTypes,
}

// export default function Button({ type = 'default', ...props }: Props) {
//     return (
//         <BaseButton {...props} />
//     )
// }
export default function Button({ type = 'default', style: _style, children, title, ...props }: Props) {
    const { onPress, onLongPress } = props;
    const { icon, iconContainerStyle, iconPosition, iconRight } = props;
    const btnTypeStyle = (() => {
        switch (type) {
            case 'confirm': return Styles.confirm;
            case 'cancel': return Styles.cancel;
            default: return null
        }
    })()
    const pressableProps = { onPress, onLongPress };
    const style = ((): ButtonStyle => {
        const fallback = {};
        let result = StyleSheet.compose(Styles.defaultStyle, btnTypeStyle) ?? fallback;
        if (!_style) return result;

        return StyleSheet.compose(StyleSheet.flatten(_style), result) ?? fallback;
    })();
    
    return (
        <Pressable {...pressableProps}>
            <SafeAreaView style={style}>
                { icon != null && iconContainerStyle != null && iconPosition != null && iconRight != null && (() => {
                    const iconProps = Object.assign(icon, iconContainerStyle, iconPosition, iconRight)
                    return <Icon {...iconProps} />
                })}
                {title && <Text style={{ color: Styles.defaultStyle.color }}>{title}</Text> || children}
            </SafeAreaView>
        </Pressable>
    )
}

const Styles = StyleSheet.create({
    defaultStyle: {
        display: 'flex', alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
        backgroundColor: css.backgroundColor.secondary, color: colors.white,
        paddingTop: '3%', paddingBottom: '3%', paddingLeft: '2.5%', paddingRight: '2.5%',
        marginTop: '2.5%',
        width: '90%', height: '10%', minHeight: 50,
        borderRadius: 6
    },
    confirm: {
        backgroundColor: css.color.confirm
    },
    cancel: {
        backgroundColor: css.color.cancel

    }
})