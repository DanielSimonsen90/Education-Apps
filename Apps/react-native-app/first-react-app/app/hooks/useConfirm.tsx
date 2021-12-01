import { BaseProps } from 'danholibraryrjs';
import React from 'react';
import { View, GestureResponderEvent as PressEvent, StyleSheet } from 'react-native';
import Button from '../components/utils/react-native-components/Button';
import Modal from '../components/utils/react-native-components/Modal';
import { useModalVisibility } from '../components/utils/react-native-components/providers/ModalVisibilityProvider';
import Text from '../components/utils/react-native-components/Text';

type PressEventHandler = (e: PressEvent) => void;
type Props = Omit<BaseProps<false>, 'style'> & {
    question: string
    // style?: {
    //     modal?: Styleable,
    //     text?: StyleProp<TextStyle>,
    //     buttonContainer?: Styleable,
    //     button?: Styleable,
    //     confirm?: Styleable,
    //     deny?: Styleable,
    // }
    onConfirm?: PressEventHandler
    onCancel?: PressEventHandler
}
export function useConfirmProps({ question, onConfirm, onCancel }: Props): [modal: JSX.Element, callConfirm: () => void] {
    const [setVisibility, visibility] = useModalVisibility();

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

    const modal = (
        <Modal style={Styles.modal}>
            <Text value={question} />
            <View style={Styles.buttonContainer}>
                <Button onPress={_onConfirm} title="Confirm" type="confirm" />
                <Button onPress={_onCancel} title="Cancel" type="cancel" />
            </View>
        </Modal>
    );

    const callConfirm = () => setVisibility(true);

    return [modal, callConfirm]
}
export function useConfirmParams(question: string, onConfirm?: PressEventHandler, onCancel?: PressEventHandler) {
    return useConfirmProps({ question, onConfirm, onCancel })
}

export default useConfirmParams;

const Styles = StyleSheet.create({
    modal: {
        overflow: 'hidden'
    },
    buttonContainer: {
        display: 'flex', flexDirection: 'row', width: '100%', overflow: 'hidden'
    }
})