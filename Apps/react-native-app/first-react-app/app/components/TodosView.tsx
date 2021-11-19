import React, { useEffect, useState } from 'react'
import { Modal, SafeAreaView, Text } from 'react-native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import TodoItem from '../models/TodoItem'
import TodoListView from './TodoListView'
import TodoItemModal from './TodoItemModal'
import { Button } from 'react-native-elements'

export default function TodosView() {
    const manager = useAsyncStorage('todos');
    const [todos, setTodos] = useState(new Array<TodoItem>());
    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItem] = useState<TodoItem>(null as unknown as TodoItem);

    useEffect(() => {
        manager.getItem((err, data) => {
            if (data) return data;
            if (err) console.error(err);
            return "[]";
        }).then(json => setTodos(json && JSON.parse(json) as Array<TodoItem> || new Array<TodoItem>()))
    }, [])

    useEffect(() => {
        console.log(`Modal should ${!showModal ? 'not ' : ''}be showing`)
    }, [showModal])

    return (
        <SafeAreaView>
            <Modal transparent animationType='slide' visible={showModal} onRequestClose={() => setShowModal(false)} style={}>
                <TodoItemModal value={modalItem} />
            </Modal>
            {todos.map((todo, i) => <TodoListView key={i} value={todo} onModalPress={i => {
                setModalItem(i);
                setShowModal(true);
            }} />)}
            <Button onPress={() => {
                const item = new TodoItem(`Todo test #${todos.length + 1}`, 'This is a marvelous test!')
                setTodos(v => [...v, item])
            }} title="Add Item" />
        </SafeAreaView>
    )
}
