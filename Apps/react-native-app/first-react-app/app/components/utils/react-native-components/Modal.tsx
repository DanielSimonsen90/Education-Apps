import { BaseProps } from 'danholibraryrjs'
import React from 'react'
import Pressable from './Pressable'
import { Modal as BaseModal, ModalProps, StyleSheet, View } from 'react-native';
import { useModalVisibility } from './providers/ModalVisibilityProvider'
import { css } from '../../../config';

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

    if (!visible) return null;

    return (
        <Pressable onPress={() => setVisible(false)}>
            <BaseModal {...props}>
                <Pressable onPress={e => e.preventDefault()}>
                    <View style={[ModalStyles.modal, style]}>{children}</View>
                </Pressable>
            </BaseModal>
        </Pressable>
    )
}

const ModalStyles = StyleSheet.create({
    modal: {
        backgroundColor: css.backgroundColor.secondary, color: css.color.secondary,
        width: '25vw', height: '25vh', padding: '1em',
        position: 'absolute',
        display: 'flex', alignSelf: 'center',
        shadowColor: "#000", shadowOffset: { height: 5, width: 0 }, shadowOpacity: .5, shadowRadius: 10,
        borderRadius: 6, transform: [{ translateY: 100 }]
    }
})
