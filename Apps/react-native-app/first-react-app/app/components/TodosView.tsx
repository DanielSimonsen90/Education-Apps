import React, { useEffect, useState } from 'react'
import { GestureResponderEvent as MouseEvent, Pressable, SafeAreaView } from 'react-native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import TodoItem from '../models/TodoItem'
import TodoListView from './TodoListView'
import TodoItemModal from './TodoItemModal'
import { Button } from 'react-native-elements'
import Modal from './utils/react-native-components/Modal'
import { useModalVisibility } from './utils/react-native-components/providers/ModalVisibilityProvider'
import { useTodos } from './utils/providers/TodosProvider'

export default function TodosView() {
    const [modalItem, setModalItem] = useState<TodoItem>(null as unknown as TodoItem);
    const [setModalVisibility] = useModalVisibility();
    const [todos, setTodos] = useTodos();

    const onAddItemPress = (e: MouseEvent) => {
        const item = new TodoItem(`Todo test #${todos.length + 1}`, 'This is a marvelous test!')
        setTodos(v => [...v, item])
    }
    const onModalPress = (item: TodoItem) => {
        setModalItem(item);
        setModalVisibility(true);
    }

    return (
        <SafeAreaView>
            <Modal><TodoItemModal value={modalItem} /></Modal>
            {todos.map((todo, i) => <TodoListView key={i} value={todo} onModalPress={onModalPress} />)}
            <Button onPress={onAddItemPress} title="Add Item" />
        </SafeAreaView>
    )
}
