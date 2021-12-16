import { BaseProps } from 'danholibraryrjs'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, colors, Button } from 'react-native-elements'
import { css, getPercentage, useDimensions } from '../config'
import TodoItem from '../models/TodoItem'
import { useTodo } from './utils/providers/TodosProvider'
import Text from './utils/react-native-components/Text'

type Props = BaseProps & {
    todo: TodoItem
    onDelete: () => void
    onEdit: () => void
}

export default function TodoListView({ todo, onDelete, onEdit }: Props) {
    const [value, setValue] = useTodo(i => i == todo);
    const { title, description, completed, deadline, doing } = value;
    const setCompleted = (state: boolean) => setValue(({ title, description, deadline }) => new TodoItem(title, description, { deadline, completed: state, doing: false }))
    const setDoing = (state: boolean) => {
        if (completed) return;

        setValue(({ title, description, deadline, completed }) => new TodoItem(title, description, { deadline, completed, doing: state }))
    }
    
    const editBtn = <Button title="Edit" 
        icon={{ name: 'edit', color: 'white', type: 'feather' }} 
        buttonStyle={{ height: swipeHeight }}
        onPress={onEdit}
    />
    const deleteBtn = <Button title="Delete" 
        icon={{ name: 'delete', color: 'white' }} 
        buttonStyle={{ height: swipeHeight, backgroundColor: colors.error }} 
        onPress={onDelete}
    />

    return (
        <ListItem.Swipeable bottomDivider style={Styles.swipeable} containerStyle={Styles.swipeableContainer}
            leftContent={editBtn} rightContent={deleteBtn} onPress={() => setDoing(!doing)}
        >
            <ListItem.Content style={{ height: '100%' }}>
                <View style={Styles.top}>
                    <ListItem.Title style={[Styles.containsText, Styles.title]}>{title}</ListItem.Title>
                    <ListItem.CheckBox checked={completed} onPress={() => setCompleted(!completed)} />
                    {/* <Checkbox checked={completed} onChange={() => setCompleted(!completed)} /> */}
                </View>
                <ListItem.Subtitle style={[Styles.containsText]}>{
                    description.length > MaxDescriptionLength ? 
                        `${description.substring(0, MaxDescriptionLength)}...` : 
                        description
                    }
                </ListItem.Subtitle>
                <Text 
                    value={`${TodoItem.GetCompletion(value)}${deadline && ` • ${value.deadline?.toLocaleString().replaceAll('.', '/')}` || ''}`}
                    style={{ color: TodoItem.GetCompletetionColor(value) }} 
                />
            </ListItem.Content>
        </ListItem.Swipeable>
    )
}

const { height, width } = useDimensions();
const MaxDescriptionLength = 75;
const swipeHeight = getPercentage(height, 20);

const Styles = StyleSheet.create({
    swipeable: {
        width: '100%', maxHeight: 100, minHeight: 50,
        flexShrink: 1,
        backgroundColor: css.backgroundColor.primary,
        paddingTop: '2%', paddingBottom: '2%',
        overflow: 'hidden', 
    },
    swipeableContainer: {
        backgroundColor: css.backgroundColor.secondary,
        maxHeight: 100
    },
    top: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        width: '100%'
    },
    title: {
        fontWeight: 'bold'
    },
    containsText: {
        color: css.color.primary
    }
})