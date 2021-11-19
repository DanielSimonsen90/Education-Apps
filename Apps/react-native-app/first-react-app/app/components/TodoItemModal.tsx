import { BaseProps } from 'danholibraryrjs';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { CheckBox, Text } from 'react-native-elements'
import TodoItem from '../models/TodoItem';

type Props = BaseProps & {
    value: TodoItem
}

export default function TodoItemModal(props: Props) {
    const { value } = props;
    const [completed, setCompleted] = useState(value.completed);
    const { title, description, deadline } = value;
    const deadlineResult = TodoItem.GetDeadlineResult(value);
    const { containerStyles, elementStyles, deadlineStyles } = TodoItemModalStyles(props);
    const onCompletedPressed = () => setCompleted(v => !v);

    return (
        <View style={containerStyles.main}>
            <View style={containerStyles.top}>
                <Text style={elementStyles.title}>{title}</Text>
                <CheckBox checked={completed} style={elementStyles.completed} onPress={onCompletedPressed} onLongPress={() => alert("Hello!")} />
            </View>
            <View style={containerStyles.description}>
                <Text style={elementStyles.description}>{description}</Text>
            </View>
            <View style={containerStyles.bottom}>
                {deadline && <Text style={{ ...elementStyles.deadline, ...(
                    deadlineResult == 'Passed' ? deadlineStyles.passed :
                    deadlineResult == 'Missed' ? deadlineStyles.missed :
                    deadlineStyles.future
                )}}>{deadline.toString()}</Text>}
            </View>
        </View>
    )
}

const TodoItemModalStyles = (props: Props) => ({
    containerStyles: StyleSheet.create({
        main: {

        },
        top: {

        },
        description: {

        },
        bottom: {

        }
    }),
    elementStyles: StyleSheet.create({
        title: {

        },
        description: {

        },
        completed: {

        },
        deadline: {

        }
    }),
    deadlineStyles: StyleSheet.create({
        passed: {

        },
        missed: {

        },
        future: {

        }
    })
})