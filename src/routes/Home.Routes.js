import React from 'react';
import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// function FindallCard({ title }) {
//     return <Text>Findall {title}</Text>
// }

import homeScreen from '../pages/Home'
import profileScreen from '../pages/Profile';

// function navigateToHome({ navigate }) {
//     return navigation.navigate('Home')
// }

// function navigateToProfile() {
//     return navigation.navigate('Profile')
// }

export default function HomeRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={homeScreen} />
            <Tab.Screen name="Perfil" component={profileScreen} />
        </Tab.Navigator>
    );
}