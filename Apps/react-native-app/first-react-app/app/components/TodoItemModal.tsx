import { BaseProps } from 'danholibraryrjs';
import React, { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { ListItem } from 'react-native-elements/dist/ListItem';
import { css, getPercentage } from '../config';
import TodoItem from '../models/TodoItem';
import { useTodo } from './utils/providers/TodosProvider';
import Text from './utils/react-native-components/Text';

type Props = BaseProps & {
    value: TodoItem
}

export default function TodoItemModal(props: Props) {
    const [value, setValue] = useTodo(i => i == props.value);
    const { title, description, deadline } = value;
    const [completed, setCompleted] = useState(value.completed);
    const deadlineResult = TodoItem.GetDeadlineResult(value);

    const { containerStyles, elementStyles, deadlineStyles } = TodoItemModalStyles();
    const onCompletedPressed = () => setCompleted(v => !v);

    useEffect(() => {
        setValue(v => {
            v.completed = completed;
            return v;
        })
    }, [completed]);

    return (
        <SafeAreaView>
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
        </SafeAreaView>
    )
}

const TodoItemModalStyles = () => {
    const { height, width } = Dimensions.get('window');

    return {
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
                fontSize: 24, fontWeight: 'bold', 
                textDecorationLine: 'underline', textDecorationColor: css.color.primary,textDecorationStyle: 'solid',
                display: 'flex', alignSelf: 'center', justifyContent: 'center'
            },
            description: {
                paddingLeft: '2%',
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
    }
}