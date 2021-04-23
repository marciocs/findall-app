import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import logo from '../../assets/Logo_Brn_1x.png';

export default function RecoveryPassword() {
    return (
        <View style={styles.container}>
            <Image source={logo} />

            <Text style={styles.title}> Esqueci senha</Text>

            <View style={styles.form}>
                <Text style={styles.label}> Seu email* </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        Recuperar senha
                    </Text>
                </TouchableOpacity>



            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818'
    },

    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8
    },

    input: {
        borderBottomWidth: 1,
        borderColor: '#dc0000',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#ffffff',
        height: 44,
        marginBottom: 20,

    },

    button: {
        height: 42,
        backgroundColor: '#dc0000',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    buttonRegister: {
        height: 42,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },

    buttonTextRegister: {
        color: '#dc0000',
        fontWeight: 'bold',
        fontSize: 16,
    }

});

