import { BaseProps } from 'danholibraryrjs'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, CheckBox } from 'react-native-elements'
import TodoItem from '../models/TodoItem'

type DeadlineValues = 'Passed' | 'Future' | 'Missed';
type Props = BaseProps & {
    value: TodoItem
}

export default function TodoListView({ value }: Props) {
    const { title, description, completed, deadline } = value;
    const deadlineResult: DeadlineValues = (() => {
        const now = new Date();

        if (!deadline) return 'Passed';
        else if (deadline.getTime() > now.getTime()) return 'Future';
        else if (now.getTime() > deadline.getTime() && !completed) return 'Missed';
        return 'Passed';
    })();

    const deadlineStyles = StyleSheet.create({
        passed: {

        },
        future: {

        },
        missed: {

        }
    })

    const containerStyles = StyleSheet.create({
        container: {
    
        },
        containerTop: {
    
        },
        description: {
    
        },
        containerBottom: {
    
        }
    })

    return (
        <View style={containerStyles.container}>
            <View style={containerStyles.containerTop}>
                <Text h1>{title}</Text>
                <CheckBox checked={completed} />
            </View>
            <View style={containerStyles.description}>
                <Text>{description}</Text>
            </View>
            <View style={containerStyles.containerBottom}>
                {deadline && <Text style={
                    deadlineResult == 'Passed' ? deadlineStyles.passed :
                    deadlineResult == 'Missed' ? deadlineStyles.missed :
                    deadlineStyles.future
                }>{deadline}</Text>}
            </View>
        </View>
    )
}