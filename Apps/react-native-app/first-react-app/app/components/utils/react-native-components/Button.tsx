import { BaseProps } from 'danholibraryrjs'
import React from 'react'
import { GestureResponderEvent as PressEvent, SafeAreaView, StyleSheet, TextStyle } from 'react-native';
import { ButtonProps, colors, Icon } from 'react-native-elements'
import { css } from '../../../config';
import Pressable from './Pressable';
import Text from './Text';

type BaseButtonTypes = 'solid' | 'clear' | 'outline';
type ButtonTypes = BaseButtonTypes | 'confirm' | 'cancel' | 'default'
type ButtonStyle = TextStyle | typeof Styles.defaultStyle;
type Props = BaseProps<false> & Omit<ButtonProps, 'type'> & {
    type?: ButtonTypes,
}

export default function Button({ type = 'default', style: _style, children, title, disabled, ...props }: Props) {
    const { onPress, onLongPress } = props;
    const { icon, iconContainerStyle, iconPosition, iconRight } = props;
    const btnTypeStyle = (() => {
        switch (type) {
            case 'confirm': return Styles.confirm;
            case 'cancel': return Styles.cancel;
            default: return null
        }
    })()
    const pressableProps = { 
        onPress: (e: PressEvent) => {
            if (!disabled) return onPress?.(e);
        },
        onLongPress: (e: PressEvent) => {
            if (!disabled) return onLongPress?.(e);
        }
     };
    const style = ((): ButtonStyle => {
        let result = StyleSheet.flatten([Styles.defaultStyle, btnTypeStyle, disabled && getDisabledStyle(type)]);
        if (!_style) return result;

        return StyleSheet.flatten([result, _style, disabled && getDisabledStyle(type)]) as ButtonStyle
    })();
    
    return (
        <Pressable {...pressableProps} style={Styles.pressable}>
            <SafeAreaView style={style}>
                { icon != null && iconContainerStyle != null && iconPosition != null && iconRight != null && (() => {
                    const iconProps = Object.assign(icon, iconContainerStyle, iconPosition, iconRight)
                    return <Icon {...iconProps} />
                })}
                {title && <Text style={{ color: Styles.defaultStyle.color }} margin={0}>{title}</Text> || children}
            </SafeAreaView>
        </Pressable>
    )
}

const Styles = StyleSheet.create({
    defaultStyle: {
        display: 'flex', alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
        backgroundColor: css.backgroundColor.secondary, color: colors.white,
        paddingTop: '3%', paddingBottom: '3%', paddingLeft: '2.5%', paddingRight: '2.5%',
        marginTop: 5,
        width: '90%', minHeight: 40,
        borderRadius: 6
    },
    confirm: {
        backgroundColor: css.color.confirm
    },
    cancel: {
        backgroundColor: css.color.cancel
    },
    pressable: {
        flexGrow: 1
    }
})

function getDisabledStyle(type: ButtonTypes) {
    const backgroundColor = (
        type == 'confirm' ? css.color.confirmDisabled :
        type == 'cancel' ? css.color.cancelDisabled :
        css.backgroundColor.secondaryDisabled
    );
    return { backgroundColor }
}