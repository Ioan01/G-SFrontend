/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

const style = require('../Frontend/styles');

import AccountView from './components/AccountView';

const App = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarPosition={'bottom'}
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarIndicatorStyle: {
            backgroundColor: style.TabHighlightColor,
          },
          tabBarStyle: {
            backgroundColor: style.TabColor,
          },
          tabBarIcon: ({focused, color}) =>
            style.TabBarIcon({route, focused, color}),
        })}>
        <Tab.Screen name="Profile" component={AccountView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
