import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Login() {
    return (
        <View style={styles.container}>
            <Text> Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818',
        color: '#fff'
    },


});

