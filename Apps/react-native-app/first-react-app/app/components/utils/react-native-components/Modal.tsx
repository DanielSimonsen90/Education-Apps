import { BaseProps } from 'danholibraryrjs'
import React from 'react'
import Pressable from './Pressable'
import { Modal as BaseModal, ModalProps, StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import { useModalVisibility } from './providers/ModalVisibilityProvider'
import { css, getPercentage } from '../../../config';

type Props = BaseProps & ModalProps & {

}

export default function Modal({ children, style, ..._props }: Props) {
    const [setVisible, visible] = useModalVisibility();
    const props = Object.assign({
        transparent: true,
        animationType: 'slide',
        onRequestClose: () => setVisible(false),
        visible, 
    }, _props)

    return (
        <Pressable onPress={() => setVisible(false)}>
            <BaseModal {...props}>
                <Pressable onPress={() => setVisible(false)} >
                    <SafeAreaView style={[ModalStyles.modal, style]}>{children}</SafeAreaView>
                </Pressable>
            </BaseModal>
        </Pressable>
    )
}

const ModalStyles = (() => {
    const { height, width } = Dimensions.get('window');

    return StyleSheet.create({
        modal: {
            backgroundColor: css.backgroundColor.secondary, color: css.color.secondary,
            width: '90%', height: getPercentage(height, 90),
            paddingLeft: '2%', paddingBottom: '5%', paddingRight: '2%', paddingTop: '5%',
            position: 'absolute',
            display: 'flex', alignSelf: 'center',
            shadowColor: "#000", shadowOffset: { height: 5, width: 0 }, shadowOpacity: .5, shadowRadius: 10,
            borderRadius: 6, transform: [{ translateY: getPercentage(height, 5) }],
            overflow: 'scroll'
        },
    })
})()
