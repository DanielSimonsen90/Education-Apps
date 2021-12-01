import React, { useMemo } from 'react'
import { GestureResponderEvent as PressEvent, SafeAreaView, StyleSheet } from 'react-native'
import TodoItem from '../models/TodoItem'
import TodoListView from './TodoListView'
import { useTodos } from './utils/providers/TodosProvider'
import Button from './utils/react-native-components/Button'
import Text from './utils/react-native-components/Text'
import { css, getPercentage, useDimensions } from '../config'
import useConfirm from '../hooks/useConfirm'

export type ModifyTodoType = 'delete'

export default function TodosView() {
    const [confirmed, modal, triggerConfirm] = useConfirm("Are you sure, you want to clear all of your completed to-dos?", 
        () => setTodos(v => v.filter(i => !i.completed))
    );
    const [todos, setTodos] = useTodos();
    const todosToClear = useMemo(() => todos.filter(v => v.completed).length, [todos]);

    const onAddItemPress = (e: PressEvent) => {
        const item = new TodoItem(`Todo test #${todos.length + 1}`, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione ullam perspiciatis distinctio ut eius quae voluptas doloremque incidunt esse voluptatum nulla necessitatibus voluptatem omnis quas facilis libero eos dolorem voluptates culpa nostrum unde, rem inventore laudantium nesciunt. Et est distinctio odit, id nostrum animi laborum nesciunt quasi voluptatibus cumque cum autem sunt tenetur fugit suscipit doloremque eligendi. Nemo possimus, non perspiciatis totam, vel magnam repudiandae quod maiores modi saepe eveniet. Suscipit qui architecto nisi, dolorem aliquam maiores? Sint libero dolorem exercitationem deserunt? Optio dolor ullam quis. Possimus illum similique laudantium doloremque. Ipsum sint qui quis quae culpa mollitia, voluptas cum assumenda reiciendis animi. Possimus est placeat quod voluptatibus voluptatum quae delectus nisi molestias nihil. Odit ea dignissimos officia dolor pariatur nesciunt corrupti, exercitationem delectus voluptate autem illo quasi aliquam animi recusandae ipsam similique harum voluptatum quae! Ratione illo animi dolores molestiae iure incidunt non vel quisquam modi deserunt ipsum quo perspiciatis cupiditate nobis architecto ullam beatae magnam ut pariatur, blanditiis eius et porro. Saepe hic quasi esse ullam et, error velit eum id, voluptates laborum voluptatum, eligendi tenetur cumque suscipit. Sint sed dignissimos ea! Quo eaque at modi nisi pariatur dolor necessitatibus! Temporibus ratione nobis illo eum mollitia blanditiis impedit, assumenda odio modi distinctio accusamus neque quis deserunt quasi facilis doloremque beatae tenetur delectus aspernatur aperiam eveniet iure. Officiis pariatur corporis asperiores delectus molestiae officia deleniti vel impedit fugiat, odit error aperiam cumque cum, at mollitia laboriosam ut et id omnis tempore? Veniam amet dicta hic totam dolores ducimus blanditiis, excepturi, unde ratione earum, aspernatur maiores eligendi veritatis asperiores ipsam architecto enim optio? Aliquid repudiandae, corrupti eveniet perspiciatis ipsam voluptatibus sunt consectetur, veniam illum temporibus dolore, quam cupiditate accusamus id et assumenda fuga aut dolorum rem laudantium ea natus! Qui, libero. Soluta unde repellat fuga nemo repellendus aperiam aut delectus voluptatibus possimus sed, non eius recusandae, omnis blanditiis! Perspiciatis, laudantium! Laborum vero rerum ab, fuga necessitatibus qui accusamus a corrupti tempora repellat explicabo alias odio eligendi. Perferendis commodi mollitia placeat dolorum ex aliquam suscipit officiis, ducimus quos sapiente! Ipsa beatae blanditiis dicta iusto numquam maiores iste, accusantium quod quam, exercitationem adipisci unde nulla odio consequuntur quo debitis reprehenderit, natus nostrum dolor. Deserunt corporis saepe eos molestiae eaque obcaecati ipsam ut commodi quaerat voluptatibus a, velit, accusamus officiis quas rerum dolorem distinctio nisi non sed repellat fuga itaque veritatis? Voluptatum veniam laudantium, vero, omnis aliquid eligendi adipisci maiores beatae quibusdam nobis iusto, sapiente illo fuga. Sequi corporis iure a molestias corrupti, eaque pariatur sapiente harum nam architecto quas et unde quo aliquid soluta obcaecati eligendi. Ex expedita accusantium, aliquid mollitia dolore maiores nisi hic, vitae quam ullam reiciendis earum itaque soluta, voluptatibus aliquam porro aut unde natus sit deleniti tempore ipsum perferendis cumque est. Ducimus adipisci quos deleniti dicta modi laudantium. Provident voluptates, doloremque amet non incidunt esse sint! Reprehenderit earum qui iusto placeat perspiciatis tempora, modi quod nam vel fugit aut ab sunt perferendis! Culpa possimus necessitatibus omnis non ipsum, voluptatum et reiciendis nulla, enim, officia dignissimos in sit soluta.")
        setTodos(v => [...v, item])
    }
    const onClearCompletedPressed = (e: PressEvent) => triggerConfirm();

    const clearCompletedComponent = todosToClear > 0 && (
        <Button style={Styles.button} onPress={onClearCompletedPressed} title="Clear Completed" type="cancel" icon={{ name: 'delete', color: 'white' }} />
    );
    const todoItemsListView = todos.length > 0 && (
        todos.map((todo, i) => ( 
            <TodoListView key={i} todo={todo} reducer={modifyTodo} />
        ))
    ) || (  
        <Text style={{ textAlign: 'center', marginBottom: '5%' }}>You have nothing to do.</Text>
    );

    return (
        <SafeAreaView style={Styles.container}>
            {modal}
            <SafeAreaView style={Styles.listContainer}>
                {todoItemsListView}
            </SafeAreaView>
            <SafeAreaView style={Styles.buttonContainer}>
                <Button style={Styles.button} onPress={onAddItemPress} title="Add Item" type="confirm" icon={{ name: 'add', color: 'white' }}/>
                {clearCompletedComponent}
            </SafeAreaView>
        </SafeAreaView>
    )

    function modifyTodo(todo: TodoItem, type: ModifyTodoType) {
        switch (type) {
            case 'delete': setTodos(v => v.filter(i => i != todo)); break;
        }
    }
}

const Styles = StyleSheet.create({
    container: {
        display: 'flex', flexDirection: 'column',
        height: '100%', width: '100%',
    },
    listContainer: {
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden'
    },
    buttonContainer: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: 5
    },
    button: {
        flexGrow: 1, flexBasis: '100%', 
    },
    addItem: {
        position: 'relative', bottom: 0,
        width: '90%', height: '10%',
        backgroundColor: css.color.confirm, color: css.color.primary
    }
})