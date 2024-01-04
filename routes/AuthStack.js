import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';

const Stack = createStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />

        </Stack.Navigator>
    );
}

