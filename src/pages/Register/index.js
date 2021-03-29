import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import logo from '../../assets/Logo_Brn_1x.png';

export default function Login() {
    return (
        <View style={styles.container}>
            <Image source={logo} />

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

                <Text style={styles.label}> Nome* </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu Nome"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Text style={styles.label}> Endereço* </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Rua 1, Nº11, Tietê-SP"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Text style={styles.label}> Telefone* </Text>
                <TextInput
                    style={styles.input}
                    placeholder="(XX) X XXXX-XXXX"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Text style={styles.label}> CPF* </Text>
                <TextInput
                    style={styles.input}
                    placeholder="000.000.00-00"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                />



                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        Registrar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister}>
                    <Text style={styles.buttonTextRegister}>
                        Cancelar
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

