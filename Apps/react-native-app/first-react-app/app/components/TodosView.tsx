import React, { useMemo } from 'react'
import { GestureResponderEvent as PressEvent, SafeAreaView, StyleSheet } from 'react-native'
import TodoListView from './TodoListView'
import { useTodos } from './utils/providers/TodosProvider'
import Button from './utils/react-native-components/Button'
import Text from './utils/react-native-components/Text'
import { css } from '../config'
import useConfirm from '../hooks/useConfirm'
import useAddItemModal from '../hooks/useAddItemModal'

export default function TodosView() {
    /* State & Props */
    const [confirmClearModal, triggerConfirmClear] = useConfirm("Are you sure, you want to clear all of your completed to-dos?", "clear-todos", {
        onConfirm: () => setTodos(v => selectedTodos && v.filter(i => !i.completed) || [])
    });
    const [addItemModal, callAddItemModal] = useAddItemModal();
    const [todos, setTodos] = useTodos();
    const selectedTodos = useMemo(() => todos.filter(v => v.completed).length > 0, [todos]);
    const containsTodos = todos.length > 0;

    /* Event handlers */
    const onAddItemPress = (e: PressEvent) => callAddItemModal()
    const onClearCompletedPressed = (e: PressEvent) => triggerConfirmClear();

    /* Components */
    const clearComponent = containsTodos && (
        <Button style={Styles.button} onPress={onClearCompletedPressed} 
            title={`Clear ${selectedTodos ? 'Completed Todos' : 'List'}`} 
            type="cancel" icon={{ name: 'delete', color: 'white' }}
            disabled={!containsTodos}
        />
    )

    const todoItemsListView = containsTodos && (
        todos.map((todo, i) => <TodoListView key={i} todo={todo} onDelete={() => setTodos(v => v.filter(i => i != todo))} />)
    ) || (  
        <Text style={{ textAlign: 'center' }} margin={{ top: '5%', bottom: '2.5%' }}>You have nothing to do.</Text>
    );

    return (
        <SafeAreaView style={Styles.container}>
            {confirmClearModal}
            {addItemModal}
            <SafeAreaView style={Styles.listContainer}>
                {todoItemsListView}
            </SafeAreaView>
            <SafeAreaView style={Styles.buttonContainer}>
                <Button style={Styles.button} onPress={onAddItemPress} title="Add Todo" type="confirm" icon={{ name: 'add', color: 'white' }}/>
                {clearComponent}
            </SafeAreaView>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    container: {
        display: 'flex', flexDirection: 'column',
        height: '100%', width: '100%',
    },
    listContainer: {
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden'
    },
    buttonContainer: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: 5
    },
    button: {
        flexGrow: 1, flexBasis: '100%', 
    },
    addItem: {
        position: 'relative', bottom: 0,
        width: '90%', height: '10%',
        backgroundColor: css.color.confirm, color: css.color.primary
    }
})