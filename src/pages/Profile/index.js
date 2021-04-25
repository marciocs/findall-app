import React, { Component } from 'react';
import { SecureStore } from 'expo';
import { View, StyleSheet, Text, Image } from 'react-native';

import userImg from '../../assets/steve-jobs.png';

import { Api } from '../../../libs/api';

export default class Profile extends Component {
    
    constructor() {
        this.state = {user_info : {
            nome : '',
            pontos : '',
            endereco : '',
            telefone : '',
            cpf : ''
        }};
    }

    componentDidMount(){

        try{
        
            SecureStore.getItemAsync('token').then((token) => {

                /*reqs.user_info(token, (results) => {
    
                    if(results.error){
                        return console.error(results.msg);
                    }
    
                    this.setState({ user_info : results.results });
    
                });*/

            })

        
        }catch(err){
            console.error(err);
        }

    }

    render(){
        return (
            <View style={styles.container}>
                <View>
                    {/* <Text style={styles.greeting}>Lv 38</Text> */}
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
