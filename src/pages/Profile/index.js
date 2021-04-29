import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import userImg from '../../assets/steve-jobs.png';

import { Api } from '../../../libs/api';
import { config } from './../../../libs/config';
import { Secure } from '../../../libs/secure';

const api_config = config.api;
const reqs = new Api(`${api_config.uri}:${api_config.port}`);

const sec = new Secure();

export default class Profile extends Component {
    
    constructor(props) {
        
        super(props);
        
        this.state = {user_info : [{
            nome : '',
            pontos : '',
            endereco : '',
            telefone : '',
            cpf : ''
        }]};

        this.navigateToLogin = this.navigateToLogin.bind(this);

    }

    componentDidMount(){

        try{
            sec.check_authenticated()
                .then((auth) => {                
                    
                    if(!auth) { this.navigateToLogin();return }

                    reqs.user_info(token)
                        .then(resp => resp.json())
                        .then(results => {
                                        
                            if(results.error){
                                throw err;
                            }
                            
                            this.setState({ user_info : results.results });

                        }).catch(err => { throw err });

                })
                .catch(err => { throw err })
            
            }catch(err){
                throw err;
            }

    }

    navigateToLogin(){
        this.props.navigation.navigate('Login')
    }

    render(){
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.greeting}>Lv 38</Text>
                    <Text style={styles.username}>{this.state.user_info[0].nome}</Text>
                    <Text style={styles.username}>Pontos {this.state.user_info[0].pontos}</Text>
                </View>

                <Image style={styles.imageuser} source={userImg} />

                <View>
                    <Text>{this.state.user_info[0].nome}</Text>
                    <Text>{this.state.user_info[0].endereco}</Text>
                    <Text>California</Text>
                    <Text>{this.state.user_info[0].telefone}</Text>
                    <Text>{this.state.user_info[0].cpf}</Text>
                </View>

            </View>
        );
    }
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
