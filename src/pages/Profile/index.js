import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import userImg from '../../assets/steve-jobs.png'

export default function Profile() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Lv 38</Text>
                <Text style={styles.username}>Steve Jobs</Text>
                <Text style={styles.username}>Pontos 1885</Text>
            </View>

            <Image style={styles.imageuser} source={userImg} />

            <View>
                <Text>Steve Jobs Apple</Text>
                <Text>Rua Maça colorida, 1884</Text>
                <Text>California</Text>
                <Text>Telefone</Text>
                <Text>CPF</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#181818',
        marginTop: 30,
        padding: 20
    },

    imageuser: {
        width: 80,
        height: 80,
        borderRadius: 40
    },

    greeting: {
        fontSize: 32,
        color: '#dc0000',
    },

    username: {
        color: '#dc0000',
    }


});
