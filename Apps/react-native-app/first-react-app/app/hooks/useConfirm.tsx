import { BaseProps } from 'danholibraryrjs';
import React, { useEffect, useState } from 'react';
import { View, GestureResponderEvent as PressEvent, StyleSheet } from 'react-native';
import Button from '../components/utils/react-native-components/Button';
import Modal from '../components/utils/react-native-components/Modal';
import { ModalMountable, useModalVisibility } from '../components/utils/react-native-components/providers/ModalVisibilityProvider';
import Text from '../components/utils/react-native-components/Text';

type PressEventHandler = (e: PressEvent) => void;
type ConfirmHandlers = {
    onConfirm?: PressEventHandler, 
    onCancel?: PressEventHandler
}
type Props = Omit<BaseProps<false>, 'style'> & ModalMountable & ConfirmHandlers & {
    question?: string
    content?: JSX.Element
    confirmId: string,
    // style?: {
    //     modal?: Styleable,
    //     text?: StyleProp<TextStyle>,
    //     buttonContainer?: Styleable,
    //     button?: Styleable,
    //     confirm?: Styleable,
    //     deny?: Styleable,
    // }
}
export function useConfirmProps({ question, content, confirmId, onMount, onUnmount, onConfirm, onCancel }: Props): [modal: JSX.Element, callConfirm: () => void] {
    const key = `confirm-${confirmId}`;
    const [setVisibility] = useModalVisibility(key, { onMount, onUnmount });

    const _onConfirm = (e: PressEvent) => {
        setVisibility(false);
        onConfirm?.(e);
        console.log("useConfirm true");
    }
    const _onCancel = (e: PressEvent) => {
        setVisibility(false)
        onCancel?.(e);
        console.log("useConfirm false");
    }

    const modalContent = (
        question && <Text value={question} /> || content
    ) ?? <Text value="Would you like to confirm?" />

    const modal = (
        <Modal style={Styles.modal} modalId={key}>
            {modalContent}
            <View style={Styles.buttonContainer}>
                <Button onPress={_onConfirm} title="Confirm" type="confirm" />
                <Button onPress={_onCancel} title="Cancel" type="cancel" />
            </View>
        </Modal>
    );

    const callConfirm = () => setVisibility(true);

    return [modal, callConfirm]
}
export function useConfirmParams(source: string | JSX.Element, confirmId: string, confirmHandlers?: ConfirmHandlers, mountHandlers?: ModalMountable) {
    return useConfirmProps({ confirmId,
        question: typeof source === 'string' ? source : undefined, 
        content: typeof source !== 'string' ? source : undefined,
        ...confirmHandlers, ...mountHandlers
    })
}
export default useConfirmParams;

const Styles = StyleSheet.create({
    modal: {
        overflow: 'hidden',
        padding: '2%',
        width: '100%'
    },
    buttonContainer: {
        display: 'flex', flexDirection: 'row', 
        width: '100%', 
        overflow: 'hidden', 
        marginTop: '2%', marginBottom: '2%', alignSelf: 'flex-end'
    }
})