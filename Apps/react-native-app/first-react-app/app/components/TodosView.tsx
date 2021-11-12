import React, { useMemo, useState } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
// import { useAsync } from 'danholibraryrjs'
import TodoItem from '../models/TodoItem'
import Error from './utils/Error'
import TodoListView from './TodoListView'

export default function TodosView() {
    const manager = useAsyncStorage('todos');
    // const todos = useAsync(async () => {
    //     const json = await manager.getItem((err, data) => {
    //         if (data) return data;
    //         if (err) console.error(err);
    //         return "[]";
    //     }) ?? "[]";
    //     return JSON.parse(json) as Array<TodoItem>;
    // });
    const todos = {
        loading: false, error: null, 
        value: [
            new TodoItem(
                "Push DanhoLibraryRJS to Github", 
                "It's very important to do this, because I may work on this when I visit dear mother", 
                { deadline: `2021-11-12T15:00:00` }
            )
        ]
    }

    return (
        todos.loading || !todos.value ? <Text>Loading todos...</Text> :
        todos.error ? <Error error={todos.error} /> :
        <SafeAreaView>
            {todos.value.map((todo, i) => <TodoListView value={todo} key={i}/>)}
        </SafeAreaView>
    )
}
