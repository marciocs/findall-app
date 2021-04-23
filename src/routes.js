import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/Login';
import Register from './pages/Register';
import RecoveryPassword from './pages/RecoveryPassword';

import HomeRoutes from './routes/Home.Routes';

export default function Routes() {
    return (
        <NavigationContainer>

            <AppStack.Navigator
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#181818'
                    },
                }}
            >
                <AppStack.Screen name='Login' component={Login} />
                <AppStack.Screen name='Register' component={Register} options={{ title: 'Registrar-se' }} />
                <AppStack.Screen name='RecoveryPassword' component={RecoveryPassword} options={{ title: 'Esqueci senha' }} />
                <AppStack.Screen name='Home' component={HomeRoutes} />
            </AppStack.Navigator>

        </NavigationContainer >
    );
}