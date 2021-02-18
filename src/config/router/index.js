import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GetStarted, Chat, Contact, Profile, EditProfile, Chatting, AddContact, DetailContact } from '../../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigatorTheme } from './BottomTabNavigationTheme';

const MainApp = () => {
    const { Navigator, Screen } = createBottomTabNavigator();
    return (
        <Navigator tabBar={props => <BottomTabNavigatorTheme {...props} />}>
            <Screen name="Chat" component={Chat} />
            <Screen name="Contact" component={Contact} />
            <Screen name="Profile" component={Profile} />
        </Navigator>
    )
}

const Router = () => {
    const { Navigator, Screen } = createStackNavigator();
    return (
        <Navigator initialRouteName="GetStarted">
            <Screen name="MainApp" component={MainApp} options={{headerShown: false}} />
            <Screen name="GetStarted" component={GetStarted} options={{headerShown: false}} />
            <Screen name="EditProfile" component={EditProfile} options={{headerShown: false}} />
            <Screen name="Chatting" component={Chatting} options={{headerShown: false}} />
            <Screen name="AddContact" component={AddContact} options={{headerShown: false}} />
            <Screen name="DetailContact" component={DetailContact} options={{headerShown: false}} />
        </Navigator>
    )
}

export default Router;
