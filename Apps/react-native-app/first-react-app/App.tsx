import Sidebar from './app/components/Sidebar';
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { css } from './app/config';
import TodosView from './app/components/TodosView';
import Prodivders from './app/components/utils/react-native-components/providers';

export default function App() {
  return (
    <Prodivders>
      <View style={Styles.container}>
        <Sidebar />
        <TodosView />
        {/* <StatusBar style="auto" /> */}
      </View>
    </Prodivders>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: css.backgroundColor.primary,
    color: css.color.primary
  },
  text: {
    color: css.color.primary
  }
});
