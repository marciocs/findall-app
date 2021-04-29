import React from 'react';
import { Text } from 'react-native';

import { Login } from './../src/pages/Login/index';

class ProtectedStack extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        if(this.props.isAuthenticated){
            //
        }else{
            return <Text style={{color : 'white'}} >não autorizado</Text>
        }
    }

};

export { 
    ProtectedStack
}

/*
export function ProtectedStack ({
    component : Component,
    isAuthenticated : isAuthenticated,
    navigator : navigator,
    ...rest
}){

    return(
            <>
                <AppStack.Screen
                    {...rest}
                    render={(props) => {
                        if (isAuthenticated){
                            component={component}
                        }else{
                            navigator.navigate(props.redirect)
                        }
                    }}
                />
            </>
    );

};*/