//import { response } from 'express';
import React, { useState } from 'react';
import { SecureStore } from 'expo';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import logo from '../../assets/Logo_Brn_1x.png';


export default function Login({ navigation }) {

    const [ getUsuarioEmail, setUsuarioEmail ] = useState([]);
    const [ getSenha, setSenha ] = useState([]);

    function navigateToRegister() {
        navigation.navigate('Register');
    }

    function doLogin(){

        fetch(`${config.api.uri}:${config.api.port}/login`, 
            {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    usuario_email : getUsuarioEmail,
                    senha : getSenha,
                    stay_connected : false
                })
            })
        .then(response => response.json())
        .then(data => {
            try{
                await SecureStore.setItemAsync('token', data.token);
            }catch(err){
                console.error('ERROR=>', err);
            }
        })
        .catch((err) => { console.log(err) })

    }

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
                    onChangeText={usuario_email => setUsuarioEmail(usuario_email)}
                />

                <Text style={styles.label}> Senha* </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    autoCompleteType="password"
                    secureTextEntry={true}
                    onChangeText={senha => setSenha(senha)}
                />

                <TouchableOpacity style={styles.button} onPress={() => { doLogin() }} testID="btn_login" >
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister}
                    onPress={navigateToRegister}
                >
                    <Text style={styles.buttonTextRegister}>
                        Registre-se
                    </Text>
                </TouchableOpacity>

            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818'
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

