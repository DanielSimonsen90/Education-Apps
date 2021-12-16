import { BaseProps } from 'danholibraryrjs'
import React from 'react'
import Pressable from './Pressable'
import { Modal as BaseModal, ModalProps, StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import { useModalVisibility } from './providers/ModalVisibilityProvider'
import { css, getPercentage, useDimensions } from '../../../config';

type Props = BaseProps & ModalProps & {
    modalId: string,
    disappearOnPress?: boolean
}

export default function Modal({ children, style, modalId, disappearOnPress = true, ..._props }: Props) {
    const [setVisible, visible] = useModalVisibility(modalId);
    const props = Object.assign({
        transparent: true,
        animationType: 'slide',
        onRequestClose: () => setVisible(false),
        visible,
    }, _props)

    return (
        <Pressable onPress={() => setVisible(false)}>
            <BaseModal {...props}>
                <Pressable onPress={() => disappearOnPress && setVisible(disappearOnPress)}>
                    <SafeAreaView style={[ModalStyles.modal, style]}>{children}</SafeAreaView>
                </Pressable>
            </BaseModal>
        </Pressable>
    )
}

const ModalStyles = (() => {
    const { height } = useDimensions();

    return StyleSheet.create({
        modal: {
            backgroundColor: css.backgroundColor.secondary, color: css.color.secondary,
            width: '90%', /* height: getPercentage(height, 90), */
            paddingLeft: '2%', paddingBottom: '5%', paddingRight: '2%', paddingTop: '5%',
            position: 'absolute', top: getPercentage(height, 2.5),
            display: 'flex', alignSelf: 'center', justifyContent: 'space-between',
            shadowColor: "#000", shadowOffset: { height: 5, width: 0 }, shadowOpacity: .5, shadowRadius: 10,
            borderRadius: 6, transform: [{ translateY: getPercentage(height, 5) }],
            overflow: 'scroll'
        },
    })
})()
