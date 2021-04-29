import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import logo from '../../assets/Logo_Brn_1x.png';
import { config } from '../../../libs/config';
import { Api } from '../../../libs/api';

const api_config = config.api;
const reqs = new Api(`${api_config.uri}:${api_config.port}`);

export default class Register extends Component {

    constructor(props){
        
        super(props);

        this.state = {
            email : '',
            nome : '',
            senha : '',
            endereco : '',
            telefone : '',
            cpf : ''
        };

        this.navigateToLogin = this.navigateToLogin.bind(this);
        this.doRegister = this.doRegister.bind(this);

    }

    doRegister(){

        reqs.register(this.state.email, this.state.nome, this.state.senha, this.state.endereco, this.state.telefone, this.state.cpf)
            .then(resp => resp.json())
            .then(results => console.log(results));

    }

    navigateToLogin(){
        this.props.navigation.navigate('Login');
    }

    render(){

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
                        onChangeText={(email) => this.setState({ email : email })}
                    />
    
                    <Text style={styles.label}> Nome* </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Seu Nome"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(nome) => this.setState({ nome : nome })}
                    />

                    <Text style={styles.label}> Senha* </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(senha) => this.setState({ senha : senha })}
                    />
    
                    <Text style={styles.label}> Endereço* </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Rua 1, Nº11, Tietê-SP"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(endereco) => this.setState({ endereco : endereco })}
                    />
    
                    <Text style={styles.label}> Telefone* </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="(XX) X XXXX-XXXX"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(telefone) => this.setState({ telefone : telefone })}
                    />
    
                    <Text style={styles.label}> CPF* </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="000.000.00-00"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(cpf) => this.setState({ cpf : cpf })}
                    />
    
    
    
                    <TouchableOpacity style={styles.button} onPress={this.doRegister}>
                        <Text style={styles.buttonText}>
                            Registrar
                        </Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.buttonRegister} onPress={this.navigateToLogin}>
                        <Text style={styles.buttonTextRegister}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
    
                </View>
            </View>
        );
    }

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

