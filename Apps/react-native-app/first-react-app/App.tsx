import Sidebar from './app/components/Sidebar';
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { css } from './app/config';

export default function App() {
  return (
    <View style={styles.container}>
      <Sidebar />
      <Text style={styles.text}>Hello Daniel</Text>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
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
