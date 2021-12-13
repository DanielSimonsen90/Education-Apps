import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useConfirmProps } from './useConfirm';
import { useTodos } from '../components/utils/providers/TodosProvider';
import TodoItem from '../models/TodoItem';
import { css } from '../config';
import DatePicker from '../components/utils/DatePicker';

export default function useAddItemModal(): [modal: JSX.Element, callAddItemModal: () => void] {
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
    const [todos, setTodos] = useTodos();
    const [confirmModal, triggerConfirmModal] = useConfirmProps({ confirmId: "add-item",
        content: (
            <View>
                <TextInput style={[Styles.getWide, Styles.title]} placeholder="Title" placeholderTextColor={placeholderColor} value={title} onPressIn={e => e.preventDefault()} onChangeText={setTitle} />
                <TextInput style={Styles.getWide} placeholder="Description" placeholderTextColor={placeholderColor} value={description} onPressIn={e => e.preventDefault()} onChangeText={setDescription} />
                <DatePicker initialState={deadline} onChange={setDate} />
            </View>
        ),
        onConfirm: e => {
            if (!title) return;

            setTodos(v => [...v, new TodoItem(title, description, { deadline })]);
            setTitle("");
            setDescription("");
        },
        onMount: () => setDate(now())
    })

    return [confirmModal, triggerConfirmModal];
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
    },
    description: {
        
    }
})
const placeholderColor = css.color.secondary