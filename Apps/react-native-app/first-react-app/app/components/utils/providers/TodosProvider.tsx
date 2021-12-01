import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { BaseProps } from 'danholibraryrjs';
import React, { createContext, useContext, Dispatch, SetStateAction, useEffect, useState, useMemo } from 'react'
import TodoItem from '../../../models/TodoItem';

type ModalContextType = [showing: Array<TodoItem>, setShowing: Dispatch<SetStateAction<Array<TodoItem>>>]
type useTodoReturn = [state: TodoItem, setState: Dispatch<SetStateAction<TodoItem>>, index: number]

const TodosContext = createContext<ModalContextType>([new Array<TodoItem>(), () => new Array<TodoItem>()]);

export function useTodos() {
    return useContext(TodosContext);
}
export function useTodo(predicate: (item: TodoItem, index: number, array: Array<TodoItem>) => boolean): useTodoReturn {
    const [todos, setTodos] = useTodos();
    const todo = useMemo(() => todos.find(predicate) || todos[0], [todos]);
    const i = useMemo(() => todos.indexOf(todo), [todo]);
    const replaceTodo = (arr: Array<TodoItem>, item: TodoItem) => {
        const temp = [...arr];
        temp[i] = item;
        return temp;
    } 
    const setTodo = (value: SetStateAction<TodoItem>) => {
        const v = typeof value === 'function' ? value(todo) : value;
        setTodos(arr => replaceTodo(arr, v));
    }

    useEffect(() => {
        setTodos(arr => replaceTodo(arr, todo))
    }, [todo]);

    return [todo, setTodo, i];
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
    useEffect(() => { 
        manager.setItem(JSON.stringify(todos), err => err && console.error(err)) 
    }, [todos])

    return (
        <TodosContext.Provider value={[todos, setTodos]}>
            {children}
        </TodosContext.Provider>
    )
}
