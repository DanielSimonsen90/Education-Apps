import { BaseProps } from 'danholibraryrjs';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { css } from '../config';
import TodoItem from '../models/TodoItem';
import Text from './utils/react-native-components/Text';

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
        <>
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
        </>
    )
}

const TodoItemModalStyles = (props: Props) => ({
    containerStyles: StyleSheet.create({
        top: {
            display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'
        },
        description: {

        },
        bottom: {

        }
    }),
    elementStyles: StyleSheet.create({
        title: {
            width: '100%',
            fontSize: 24,
            fontWeight: 'bold',
            display: 'flex', alignSelf: 'center'
        },
        description: {
            paddingLeft: '.33rem',
            color: css.color.dampen
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