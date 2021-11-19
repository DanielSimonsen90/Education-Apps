import { BaseProps } from 'danholibraryrjs'
import React, { useState } from 'react'
import { ListItem, colors, Button } from 'react-native-elements'
import TodoItem from '../models/TodoItem'

type Props = BaseProps & {
    value: TodoItem
    onModalPress: (todoItem: TodoItem) => void
}

export default function TodoListView({ value, onModalPress }: Props) {
    const { title, description, deadline } = value;
    const [completed, setCompleted] = useState(value.completed);
    const deadlineBtn = <Button title="Deadline" icon={{ name: 'schedule', color: 'white' }} buttonStyle={{ minHeight: '100%' }} />
    const deleteBtn = <Button title="Delete" icon={{ name: 'delete', color: 'white' }} buttonStyle={{ minHeight: '100%', backgroundColor: colors.error }} />

    const toggleCompleted = () => setCompleted(v => !v);

    return (
        <ListItem.Swipeable bottomDivider leftContent={deadlineBtn} rightContent={deleteBtn} onPress={() => onModalPress(value)}>
            <ListItem.Content>
                <ListItem.CheckBox checked={completed} onPress={toggleCompleted} />
                <ListItem.Title>{title}</ListItem.Title>
                <ListItem.Subtitle>{description}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem.Swipeable>
    )
}