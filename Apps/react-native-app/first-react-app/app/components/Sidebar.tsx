import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import { css } from '../config';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
    const children = [
        <SidebarItem style={Styles.sidebarItem} />,
    ]

    return (
        <SafeAreaView style={Styles.container}>
            {children}
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '25%',
        backgroundColor: css.backgroundColor.secondary,
        color: css.color.secondary,
        display: 'flex',
        flexDirection: 'column',
        padding: '2.5%'
    },
    sidebarItem: {
        margin: '2%'
    }
})
