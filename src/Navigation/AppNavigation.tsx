import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../Screens';
import {initAPIConfig} from '../Services';

const Stack = createStackNavigator();

const AppStack = () => {
  initAPIConfig({isLoggedIn: false, authToken: null});
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'HomeScreen'}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
