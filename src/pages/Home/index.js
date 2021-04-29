import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Secure } from '../../../libs/secure';

console.log((new Secure()).check_authenticated);

const sec = new Secure();

export default class HomeRoutes extends Component {

    constructor(props){
        
        super(props);
        
        this.state = {};

        this.navigateToLogin = this.navigateToLogin.bind(this);

    }

    componentDidMount(){

        sec.check_authenticated()
            .then(auth => {
                if (!auth) this.navigateToLogin()
            })
            .catch(err => { throw err; })

    }

    navigateToLogin(){
        this.props.navigation.navigate('Login');
    }
    
    render(){
        return (
            <View style={styles.container}>
                <Text> Home</Text>
            </View>
        );
    }

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

