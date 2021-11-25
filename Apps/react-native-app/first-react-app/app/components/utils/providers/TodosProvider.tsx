import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { BaseProps } from 'danholibraryrjs';
import React, { createContext, useContext, Dispatch, SetStateAction, useEffect, useState, useMemo } from 'react'
import TodoItem from '../../../models/TodoItem';

type ModalContextType = [showing: Array<TodoItem>, setShowing: Dispatch<SetStateAction<Array<TodoItem>>>]
const TodosContext = createContext<ModalContextType>([new Array<TodoItem>(), () => new Array<TodoItem>()]);

export function useTodos() {
    return useContext(TodosContext);
}
export function useTodo(predicate: (item: TodoItem, index: number, array: Array<TodoItem>) => boolean) {
    const [todos] = useTodos();
    return useState(useMemo(() => todos.find(predicate) || todos[0], [todos]));
}

type Props = BaseProps & {

}

export default function TodosProvider({ children }: Props) {
    const manager = useAsyncStorage('todos');
    const [todos, setTodos] = useState(new Array<TodoItem>());

    useEffect(() => {
        manager.getItem((err, data) => {
            if (data) return data;
            if (err) console.error(err);
            return "[]";
        }).then(json => {
            const items = json && JSON.parse(json) as Array<any> || new Array<any>();
            if (items) setTodos(items.map(i => TodoItem.JsonParse(i)))
        })
    }, [])
    useEffect(() => { manager.setItem(JSON.stringify(todos), err => err && console.error(err)) }, [todos])

    return (
        <TodosContext.Provider value={[todos, setTodos]}>
            {children}
        </TodosContext.Provider>
    )
}
