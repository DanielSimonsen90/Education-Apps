import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useConfirmProps } from './useConfirm';
import { useTodos } from '../components/utils/providers/TodosProvider';
import TodoItem from '../models/TodoItem';
import { css } from '../config';
import DatePicker from '../components/utils/DatePicker';
import Checkbox from '../components/utils/Checkbox';

const placeholderColor = css.color.secondary

export default function useAddItemModal(): [modal: JSX.Element, callAddItemModal: (base?: TodoItem) => void] {
    // const now = () => {
    //     let result = new Date();
    //     const date = result.getDate();
    //     result.setDate(date + 1);
    //     return result;
    // }
    const now = () => new Date();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDate] = useState(now());
    const [allowDeadline, setAllowDeadline] = useState(false);

    const onCheckboxChecked = (value: boolean) => {
        setDate(now());
        setAllowDeadline(value);
    }
    const resetState = () => {
        setTitle("");
        setDescription("");
        setAllowDeadline(false);
        setDate(now());
    }

    const [todos, setTodos] = useTodos();
    const [confirmModal, triggerConfirmModal] = useConfirmProps({ confirmId: "add-item",
        content: (
            <View>
                <TextInput style={[Styles.getWide, Styles.title]} placeholder="Title" placeholderTextColor={placeholderColor} value={title} onPressIn={e => e.preventDefault()} onChangeText={setTitle} />
                <TextInput style={Styles.getWide} placeholder="Description" placeholderTextColor={placeholderColor} value={description} onPressIn={e => e.preventDefault()} onChangeText={setDescription} />
                <Checkbox title="Give Deadline" checked={allowDeadline} onChange={onCheckboxChecked}/>
                {allowDeadline && <DatePicker initialState={deadline} onChange={setDate} containerStyle={{ marginTop: '5%', marginBottom: '5%' }} />}
            </View>
        ),
        onConfirm: e => {
            if (!title) return;

            const existsIndex = todos.findIndex(t => t.title == title);
            setTodos(v => {
                const copy = [...v];
                copy[existsIndex == -1 ? copy.length : existsIndex] = new TodoItem(title, description, { deadline: allowDeadline && deadline || null });
                return copy;
            });
            
            resetState();
        },
        onCancel: () => resetState(),
    })

    const triggerAddModal = (base?: TodoItem) => {
        if (base) {
            setTitle(base.title);
            base.description && setDescription(base.description);
            
            if (base.deadline) {
                setAllowDeadline(true);
                setDate(base.deadline);
            }
        }

        triggerConfirmModal();
    }

    return [confirmModal, triggerAddModal];
}

const Styles = StyleSheet.create({
    getWide: {
        width: '100%',
        color: css.color.primary,
        paddingLeft: '2%',
        marginBottom: '5%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})