import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { useConfirmProps } from './useConfirm';
import { useTodos } from '../components/utils/providers/TodosProvider';
import TodoItem from '../models/TodoItem';
import { css } from '../config';
import DatePicker from '../components/utils/DatePicker';

export default function useAddItemModal(): [modal: JSX.Element, callAddItemModal: () => void] {
    const now = (() => {
        let result = new Date();
        const date = result.getDate();
        result.setDate(date + 1);
        return result;
    })()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDate] = useState(now);
    const [todos, setTodos] = useTodos();

    const [modal, callConfirm] = useConfirmProps({
        content: (
            <>
                <TextInput style={[Style.getWide]} placeholder="Title" placeholderTextColor={placeholderColor} value={title} onPressIn={e => e.preventDefault()} onChangeText={setTitle} />
                <TextInput style={Style.getWide} placeholder="Description" placeholderTextColor={placeholderColor} value={description} onPressIn={e => e.preventDefault()} onChangeText={setDescription} />
                <DatePicker initialState={deadline} onChange={setDate} />
            </>
        ),
        onConfirm: e => {
            if (title) setTodos(v => [...v, new TodoItem(title, description, { deadline })])
        }
    })

    return [modal, callConfirm];
}

const Style = StyleSheet.create({
    getWide: {
        width: '100%',
        color: css.color.primary,
        paddingLeft: '2%',
        marginBottom: '5%'
    },
    title: {

    }
})
const placeholderColor = css.color.secondary