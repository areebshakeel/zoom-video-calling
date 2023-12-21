import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CallScreen from './screens/CallScreen';
import JoinScreen from './screens/JoinScreen';
import IntroScreen from './screens/IntroScreen';
export const MainStackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName={"CallScreen"}
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen
                key={"CallScreen"}
                name={"CallScreen"}
                component={CallScreen}
            />
            <Stack.Screen
                key={"JoinScreen"}
                name={"JoinScreen"}
                component={JoinScreen}
            />
            <Stack.Screen
                key={"IntroScreen"}
                name={"IntroScreen"}
                component={IntroScreen}
            />
        </Stack.Navigator>
    );
};