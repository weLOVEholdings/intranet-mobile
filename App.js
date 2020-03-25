/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home';
import Timeline from './src/screens/Timeline';
import Reports from './src/screens/Reports';
import Intelligence from './src/screens/Intelligence';
import Objectives from './src/screens/Objectives';
import Companies from './src/screens/Companies';
import Sales from './src/screens/Sales';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Timeline" component={Timeline} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="Intelligence" component={Intelligence} />
        <Stack.Screen name="Objectives" component={Objectives} />
        <Stack.Screen name="Companies" component={Companies} />
        <Stack.Screen name="Sales" component={Sales} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
