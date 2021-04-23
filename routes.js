import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { config } from './lib/config';

const AppStack = createStackNavigator();

import Login from './pages/Login';
import Register from './pages/Register';

export default function Routes() {
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{ HeaderStyle: { backgroundColor: '#dc000' }, headerTintColor: '#fff' }}>
                <AppStack.Screen name='Login' component={Login} />
                <AppStack.Screen name='Register' component={Register} options={{ title: 'Registrar-se' }} />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}