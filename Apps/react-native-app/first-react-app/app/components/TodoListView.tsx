import { BaseProps } from 'danholibraryrjs'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, colors, Button } from 'react-native-elements'
import { css, getPercentage, useDimensions } from '../config'
import TodoItem from '../models/TodoItem'
import { useTodo } from './utils/providers/TodosProvider'

type Props = BaseProps & {
    todo: TodoItem
    onDelete: () => void
}

export default function TodoListView({ todo, onDelete }: Props) {
    const [value, setValue] = useTodo(i => i == todo);
    const { title, description, completed, deadline } = value;
    const setCompleted = (state: boolean) => setValue(({ title, description, deadline }) => new TodoItem(title, description, { deadline, completed: state }))
    
    const deadlineBtn = <Button title="Deadline" 
        icon={{ name: 'schedule', color: 'white' }} 
        buttonStyle={{ height: swipeHeight }}
    />
    const deleteBtn = <Button title="Delete" 
        icon={{ name: 'delete', color: 'white' }} 
        buttonStyle={{ height: swipeHeight, backgroundColor: colors.error }} 
        onPress={onDelete}
    />

    return (
        <ListItem.Swipeable bottomDivider style={Styles.swipeable}
            leftContent={deadlineBtn} rightContent={deleteBtn} 
        >
            <ListItem.Content>
                <View style={Styles.top}>
                    <ListItem.Title>{title}</ListItem.Title>
                    <ListItem.CheckBox checked={completed} onPress={() => setCompleted(!completed)} />
                </View>
                <ListItem.Subtitle style={Styles.description}>{
                    description.length > MaxDescriptionLength ? 
                        `${description.substring(0, MaxDescriptionLength)}...` : 
                        description
                    }
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem.Swipeable>
    )
}

const { height } = useDimensions();
const MaxDescriptionLength = 250;
const swipeHeight = getPercentage(height, 20);

const Styles = StyleSheet.create({
    swipeable: {
        width: '100%', height: swipeHeight,
        backgroundColor: css.backgroundColor.primary,
        paddingTop: '2%', paddingBottom: '2%',
        overflow: 'hidden'
    },
    top: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        width: '100%'
    },
    description: {
        overflow: 'hidden'
    }
})