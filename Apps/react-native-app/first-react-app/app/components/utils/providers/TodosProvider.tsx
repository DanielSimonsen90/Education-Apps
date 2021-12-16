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
            if (items) setTodos([...new Set(items.values())].map(i => TodoItem.JsonParse(i)))
        })
    }, [])
    useEffect(() => { 
        manager.setItem(JSON.stringify(todos), err => err && console.error(err)) 
    }, [todos])

    return (
        <TodosContext.Provider value={[(() => {
            // const [completed, uncompleted] = splitArrayBy(todos, i => i.completed);
            // const [deadline, noDeadline] = splitArrayBy(uncompleted, i => i.deadline != null);
            // const [futureDeadline, pastDeadline] = splitArrayBy(deadline, i => i.deadline && i.deadline.getTime() > Date.now() || false)
            // const [doingDeadline, missedDeadline] = splitArrayBy(pastDeadline, i => i.doing);
            // const [doing, neutral] = splitArrayBy(noDeadline, i => i.doing);

            // const filtered = [missedDeadline, doingDeadline, futureDeadline, doing, neutral, completed];
            // const result = filtered.flat();
            // console.log(result, { filtered, missedDeadline, doingDeadline, futureDeadline, neutral, doing, completed });
            // return result;
            return filterTodos(todos)
        })(), setTodos]}>
            {children}
        </TodosContext.Provider>
    )
}

type FilterProperties = 'completed' | 'deadline' | 'doing' | 'future' | 'missed' | 'blank'
type FilterObj = Record<FilterProperties, (i: TodoItem) => boolean> & {
    deadlines: (a: TodoItem, b: TodoItem) => number
}

function filterTodos(todos: Array<TodoItem>) {
    const filters: FilterObj  = {
        completed: i => i.completed,
        deadline: i => i.deadline != null,
        deadlines: (a, b) => a.deadline && b.deadline && a.deadline.getTime() - b.deadline.getTime() || 0,
        doing: i => i.doing,
        future: i => i.deadline && i.deadline.getTime() > Date.now() || false,
        missed: i => i.deadline && i.deadline.getTime() < Date.now() || false,
        blank: i => !i.deadline && !i.doing && !i.completed || false
    }
    
    //[missedDeadline, doingDeadline, futureDeadline, doing, blank, completed]
    const result = [
        todos.filter(filters.missed).filter(i => !filters.completed(i)), //missedDeadline 
        todos.filter(filters.doing).filter(filters.deadline),           //doingDeadline
        todos.filter(filters.future),                                   //futureDeadline
        todos.filter(filters.doing).filter(i => !filters.deadline(i)),  //doing 
        todos.filter(filters.blank),                                    //blank
        todos.filter(filters.completed)                                 //completed
    ].map(arr => arr.sort(filters.deadlines));

    const [missedDeadline, doingDeadline, futureDeadline, doing, blank, completed] = result;
    console.log({ missedDeadline, doingDeadline, futureDeadline, doing, blank, completed, todos });
    

    return [...new Set<TodoItem>(result.flat().values())];
    // return result.flat();
}

function splitArrayBy(array: Array<TodoItem>, predicate: (item: TodoItem) => boolean): [Array<TodoItem>, Array<TodoItem>] {
    return [array.filter(predicate), array.filter(i => !predicate(i))]
}
