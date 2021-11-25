import Sidebar from './app/components/Sidebar';
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { css } from './app/config';
import TodosView from './app/components/TodosView';
import ReactNativeProdivders from './app/components/utils/react-native-components/providers';
import Providers from './app/components/utils/providers';

export default function App() {
  return (
    <ReactNativeProdivders>
      <Providers>
        <View style={Styles.container}>
          <Sidebar />
          <TodosView />
          {/* <StatusBar style="auto" /> */}
        </View>
      </Providers>
    </ReactNativeProdivders>
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
