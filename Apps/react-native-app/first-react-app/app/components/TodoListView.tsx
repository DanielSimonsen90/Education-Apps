// import { BaseProps } from 'danholibraryrjs'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, CheckBox, colors } from 'react-native-elements'
import { css } from '../config';
import TodoItem from '../models/TodoItem'

type DeadlineValues = 'Passed' | 'Future' | 'Missed';
type BaseProps = {} //temp until DanhoLibraryRJS is good
type Props = BaseProps & {
    value: TodoItem
}

export default function TodoListView({ value }: Props) {
    const { title, description, deadline } = value;
    const [completed, setCompleted] = useState(value.completed);

    const deadlineResult: DeadlineValues = (() => {
        const now = new Date();

        if (!deadline) return 'Passed';
        else if (deadline.getTime() > now.getTime()) return 'Future';
        else if (now.getTime() > deadline.getTime() && !completed) return 'Missed';
        return 'Passed';
    })();

    const onCompletedPressed = () => setCompleted(v => !v);
    
    const deadlineStyles = StyleSheet.create({
        passed: {
            color: colors.success
        },
        future: {
            color: css.color.primary
        },
        missed: {
            color: colors.error
        }
    });

    const containerStyles = StyleSheet.create({
        main: {
            display: 'flex',
            flexDirection: 'column',
            width: '75%'
        },
        top: {
        },
        description: {
        },
        bottom: {
        }
    });

    const elementStyles = StyleSheet.create({
        title: {
            color: css.color.primary,
            fontSize: 18,
            fontWeight: 'bold',
            margin: '2%',
            width: '100%'
        },
        completed: {

        },
        description: {
            color: css.color.primary
        },
        deadline: {

        }
    });

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