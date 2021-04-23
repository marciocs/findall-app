import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../../assets/Logo_Brn_1x.png';


export default function Login({ navigation }) {

    Icon.loadFont();

    function navigateToRegister() {
        navigation.navigate('Register')
    }

    function navigateToHome() {
        navigation.navigate('Home')
    }

    function navigateToRecoveryPassword() {
        navigation.navigate('RecoveryPassword')
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
                />

                <Text style={styles.label}> Senha* </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    autoCompleteType="password"
                />

                <TouchableOpacity style={styles.recovery}
                    onPress={navigateToRecoveryPassword}
                >
                    <Text style={styles.buttonText}>
                        Esqueci senha
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={navigateToHome}
                >
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

                <TouchableOpacity style={styles.buttonRegister}
                // onPress={navigateToRegister}
                >

                    <Text style={styles.buttonTextGoogle}>
                        Entrar com <Icon name="google" size={20} color="red" />oogle
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonFacebook} icon="facebook"
                // onPress={navigateToRegister}
                >

                    <Text style={styles.buttonTextFacebook}>
                        Entrar com  <Icon name="facebook" size={20} color="#FFF" />acebook


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

    recovery: {
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,

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
    },

    buttonFacebook: {
        height: 42,
        backgroundColor: '#1877f2',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },

    buttonTextFacebook: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    buttonTextGoogle: {
        color: '#181818',
        fontWeight: 'bold',
        fontSize: 16,
    }

});

